# design_agent/core.py
from __future__ import annotations
import json, math
from typing import Dict, Any

# ====== Prompts & JSON Schema ======
SYSTEM_BASE = """You are a senior UI designer for React/Next.js + Tailwind.
You specialize in GenAI & multi-agent apps: conversational UX, streaming responses,
tool-call visibility, safety (redaction, toxicity), and citations.

DESIGN FOCUS:
- Create design systems that match the specified tone and personality
- Adapt complexity based on the design complexity level (1000-7000)
- Ensure visual hierarchy and user experience excellence
- Consider industry-specific design patterns and best practices

Return ONLY valid minified JSON matching the provided schema. Use hex colors.
Prefer high contrast (WCAG AA 4.5:1 or better). Keep component names PascalCase.
Include AI UX components (ChatComposer, MessageBubble, RunTimeline)."""

USER_TEMPLATE = """Purpose: {purpose}
Audience: {audience}
Tone: {tone}
Domain subject: {subject}
Brand colors (optional): {brand}
Constraints: {constraints}
AI use cases: {ai_use_cases}
Design complexity: {latency_budget} (higher values = more complex design)
Needs citations: {needs_citations}

IMPORTANT DESIGN TONE CONTEXT:
The tone field now contains comprehensive design personality options including:
- Professional & Corporate: calm/precise/credible, professional/trustworthy/authoritative, sophisticated/elegant/refined
- Modern & Innovative: modern/innovative/cutting-edge, futuristic/tech-forward/dynamic, bold/confident/progressive
- Creative & Artistic: creative/artistic/expressive, playful/fun/engaging, imaginative/whimsical/inspiring
- Healthcare & Wellness: caring/compassionate/healing, medical/clinical/sterile, wellness/holistic/nurturing
- Financial & Business: financial/secure/stable, business/professional/reliable, luxury/premium/exclusive
- Educational & Academic: educational/informative/enlightening, academic/scholarly/intellectual
- Security & Trust: secure/protected/safe, trustworthy/dependable/reliable, confidential/private/discreet
- Environmental & Sustainable: natural/organic/eco-friendly, sustainable/green/environmental
- Entertainment & Media: entertaining/engaging/captivating, media/dynamic/fast-paced
- Government & Public: official/governmental/authoritative, public/civic/community

DESIGN COMPLEXITY CONTEXT:
The latency_budget field now represents design complexity levels:
- 1000-1400: Simple/Basic/Essential designs
- 1800-2200: Standard/Comprehensive/Professional designs  
- 2500-3000: Advanced/Complex/Premium designs
- 3500-4500: Creative/Artistic/Bespoke designs
- 5000-7000: Enterprise/Platform/Suite designs

Return JSON matching the schema. Include Tailwind tokens, AI state tokens,
and a Next.js App Router file list with ChatComposer, MessageBubble, RunTimeline.
"""

SCHEMA: Dict[str, Any] = {
  "type":"object",
  "properties":{
    "designSystem":{"type":"object","properties":{
      "palette":{"type":"object","properties":{
        "primary":{"type":"string"},"bg":{"type":"string"},"surface":{"type":"string"},
        "success":{"type":"string"},"warning":{"type":"string"},"danger":{"type":"string"},
        "accent":{"type":"string"},"muted":{"type":"string"},
        "onBg":{"type":"string"},"onSurface":{"type":"string"},"onPrimary":{"type":"string"},
        "thinking":{"type":"string"},"streaming":{"type":"string"},"toolCall":{"type":"string"},
        "citation":{"type":"string"},"safety":{"type":"string"}
      },"required":["primary","bg","surface","success","warning","danger","accent","muted","onBg","onSurface","onPrimary"]},
      "typography":{"type":"object","properties":{
        "fontFamily":{"type":"object"},"fontSize":{"type":"object"},"fontWeight":{"type":"object"},
        "lineHeight":{"type":"object"},"letterSpacing":{"type":"object"}
      }},
      "spacing":{"type":"object"},"radius":{"type":"object"},
      "shadows":{"type":"object"},"motion":{"type":"object","properties":{
        "duration":{"type":"object"},"easing":{"type":"object"}
      }},
      "a11y":{"type":"object","properties":{
        "focusRing":{"type":"string"},"reducedMotion":{"type":"boolean"}
      }},
      "aiStates":{"type":"array","items":{"type":"object","properties":{
        "name":{"type":"string"},"color":{"type":"string"},"description":{"type":"string"}
      }}}
    },"required":["palette","typography","spacing","radius","shadows","motion","a11y","aiStates"]},
    "ux":{"type":"object","properties":{
      "layout":{"type":"string"},"informationDensity":{"type":"string"},
      "primaryActions":{"type":"array"},"userJourneys":{"type":"array"},
      "aiPattern":{"type":"string","enum":["conversational","copilot","workflow","orchestrator"]},
      "streamingStrategy":{"type":"string"},"citationDisplay":{"type":"string"}
    }},
    "aiSolution":{"type":"object","properties":{
      "safety":{"type":"object","properties":{
        "contentFiltering":{"type":"boolean"},"redaction":{"type":"boolean"},
        "hallucinationCues":{"type":"boolean"},"guardrails":{"type":"array"}
      }},
      "observability":{"type":"object","properties":{
        "eventSchema":{"type":"object"},"telemetry":{"type":"boolean"},
        "runTimeline":{"type":"boolean"},"tokenMeter":{"type":"boolean"}
      }},
      "latency":{"type":"object","properties":{
        "targetMs":{"type":"number"},"optimisticUI":{"type":"boolean"},
        "skeletonStrategy":{"type":"string"}
      }},
      "agentOrchestration":{"type":"object","properties":{
        "handoffUX":{"type":"string"},"toolVisibility":{"type":"string"},
        "errorRecovery":{"type":"string"}
      }}
    }},
    "components":{"type":"array","items":{"type":"object","properties":{
      "name":{"type":"string"},"type":{"type":"string"},"states":{"type":"array"},
      "a11y":{"type":"object"},"aiSpecific":{"type":"object"}
    }}},
    "tailwind":{"type":"object","properties":{
      "configTokens":{"type":"object"},"utilityClasses":{"type":"object"}
    }},
    "next":{"type":"object","properties":{
      "fileTree":{"type":"array"},"routing":{"type":"object"},
      "components":{"type":"array"}
    }},
    "narrativeDescription":{"type":"string"}
  },
  "required":["designSystem","ux","aiSolution","components","tailwind","next","narrativeDescription"]
}

# ====== Color & contrast helpers ======
def _clip01(x: float) -> float:
    return max(0.0, min(1.0, x))

def _srgb_to_lin(u: float) -> float:
    return (u/12.92) if u <= 0.04045 else ((u+0.055)/1.055) ** 2.4

def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))
    r, g, b = _srgb_to_lin(r), _srgb_to_lin(g), _srgb_to_lin(b)
    return 0.2126*r + 0.7152*g + 0.0722*b

def contrast_ratio(c1: str, c2: str) -> float:
    L1, L2 = luminance(c1), luminance(c2)
    L1, L2 = (L1, L2) if L1 >= L2 else (L2, L1)
    return (L1 + 0.05) / (L2 + 0.05)

def wcag_pass(fg: str, bg: str, level: float = 4.5) -> bool:
    return contrast_ratio(fg, bg) >= level

# Simple fallback if contrast fails: try white, else black
def improve_contrast(fg: str, bg: str) -> str:
    return "#FFFFFF" if contrast_ratio("#FFFFFF", bg) >= 4.5 else "#0B0B0B"

# ====== Spec validation / correction ======
def validate_and_fix_palette(spec: Dict[str, Any]) -> Dict[str, Any]:
    pal = spec["designSystem"]["palette"]
    for fg_key, bg_key in [("onBg","bg"), ("onSurface","surface"), ("onPrimary","primary")]:
        if not wcag_pass(pal[fg_key], pal[bg_key], 4.5):
            pal[fg_key] = improve_contrast(pal[fg_key], pal[bg_key])
    spec["designSystem"]["palette"] = pal
    return spec

def pack_user_prompt(**kwargs) -> str:
    return USER_TEMPLATE.format(**kwargs)

def pack_schema_for_model() -> str:
    return json.dumps({"schema": SCHEMA}) 

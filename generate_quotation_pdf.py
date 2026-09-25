#!/usr/bin/env python3
"""
Generates an Executive Luxury PDF Quotation for the Aurelle E-Commerce Flagship in INR.
Updated with Enterprise Security Auth, AI RAG Concierge, Rival Parity, and Auto-Ship Subscriptions.
Commercial Investment Package: ₹2,45,000 INR Standard -> ₹2,15,000 INR Net Preferred Launch Rate.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf(filename="Aurelle_Luxe_Store_Official_Quotation_INR.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=32,
        bottomMargin=32,
    )

    styles = getSampleStyleSheet()
    
    # Custom Luxury Color Palette
    gold_color = colors.HexColor("#C8A75A")
    gold_dark = colors.HexColor("#9E7D32")
    graphite_color = colors.HexColor("#1C1C26")
    mist_color = colors.HexColor("#6D6A8C")
    light_bg = colors.HexColor("#F8F7FA")
    card_bg = colors.HexColor("#FFFFFF")
    border_color = colors.HexColor("#E2DFED")
    green_accent = colors.HexColor("#2F7D6B")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=graphite_color,
        textTransform='uppercase',
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=graphite_color,
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=graphite_color,
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=graphite_color,
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=graphite_color,
    )

    table_cell_right = ParagraphStyle(
        'TableCellRight',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        alignment=TA_RIGHT,
        textColor=graphite_color,
    )

    elements = []

    # ==========================================
    # PAGE 1: HEADER, CLIENT INFO, OVERVIEW, MODULES 1-4
    # ==========================================

    # 1. Header Bar: Brand Wordmark + Document Metadata
    header_data = [
        [
            Paragraph("<b>AURELLE</b><br/><font color='#C8A75A' size='8'>HYGIENE HARDWARE • OFFICIAL COMMERCIAL QUOTATION</font>", title_style),
            Paragraph("<b>QUOTATION #:</b> QTN-AUR-2026-V3-ENTERPRISE<br/><b>DATE:</b> September 25, 2026<br/><b>VALIDITY:</b> 15 Days<br/><b>DEPLOYED:</b> aurelle-luxe-store.vercel.app", table_cell_right)
        ]
    ]
    header_table = Table(header_data, colWidths=[330, 210])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(header_table)
    elements.append(HRFlowable(width="100%", thickness=2, color=gold_color, spaceBefore=4, spaceAfter=8))

    # 2. Client & Developer Information
    client_info_data = [
        [
            Paragraph("<b>PREPARED FOR (CLIENT):</b><br/><b>Brand:</b> Aurelle / Siddhi Website<br/><b>Project:</b> Luxury 3D D2C Flagship + Security & AI Suite<br/><b>Target Turnaround:</b> 7 Calendar Days", table_cell_style),
            Paragraph("<b>DEVELOPER / CREATIVE TECHNOLOGIST:</b><br/><b>Name:</b> Krishna Mathur<br/><b>Role:</b> Senior Creative Technologist & Full-Stack Lead<br/><b>Delivery:</b> GitHub Repository & Live Vercel Production", table_cell_style),
        ]
    ]
    client_table = Table(client_info_data, colWidths=[270, 270])
    client_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), light_bg),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    elements.append(client_table)
    elements.append(Spacer(1, 8))

    # 3. Project Scope Overview
    elements.append(Paragraph("EXECUTIVE ARCHITECTURAL SCOPE & SPECIFICATION", h2_style))
    elements.append(Spacer(1, 2))
    elements.append(Paragraph(
        "Complete turnkey engineering, interactive 3D WebGL modeling, security architecture, and edge deployment for <b>Aurelle Hygiene Hardware</b>. Delivers 1:1 physical product fidelity matching client sample (Photo 3), real-time interactive 3D studio, 'Visual Stories' vertical UGC video reels (+₹500 voucher reward loop), gap-free milestone cart drawer, enterprise-grade authentication with Google & Apple OAuth and +91 Mobile OTP, an intelligent AI RAG Concierge Chatbot grounded in 7 domain dossiers, and full rival parity (Suvaam & Clorox) with stock scarcity badges and recurring auto-ship subscriptions.",
        body_style
    ))
    elements.append(Spacer(1, 8))

    # 4. Modules 1-4 Table (Core Experience)
    elements.append(Paragraph("ITEMIZED DELIVERABLES — PHASE I: CORE LUXURY STOREFRONT", h2_style))
    elements.append(Spacer(1, 3))

    phase1_data = [
        [
            Paragraph("SCOPE MODULE", table_header_style),
            Paragraph("TECHNICAL SPECIFICATION & KEY DELIVERABLES", table_header_style),
            Paragraph("EST. VALUE (INR)", table_header_style),
        ],
        [
            Paragraph("<b>1. Brand Creative Direction & Design System</b>", table_cell_bold),
            Paragraph("• Curated porcelain, travertine, and brushed champagne gold design tokens<br/>• Luxury boutique preloader reveal animation on site refresh/load<br/>• Top infinite running announcement marquee ticker ('the running things' from rival reference)", table_cell_style),
            Paragraph("₹35,000", table_cell_right),
        ],
        [
            Paragraph("<b>2. 3D WebGL Real-Time Hardware Studio</b>", table_cell_bold),
            Paragraph("• 1:1 CAD reconstruction matching physical client product (Photo 3):<br/>  - Rectangular dock with raised Champagne Gold perimeter bezel<br/>  - Flat-rectangular wand with suspension eyelet & gold thumb slider<br/>• Real-time daylight/sunset lighting, 4 luxury wall surfaces & 360° touch rotation", table_cell_style),
            Paragraph("₹65,000", table_cell_right),
        ],
        [
            Paragraph("<b>3. Shoppable 'Visual Stories' Video Reels</b>", table_cell_bold),
            Paragraph("• 4-card 9:16 vertical video reel player with real MP4 streaming<br/>• Interactive timeline scrubber, sound toggle, & full-screen lightbox<br/>• Patron UGC review video upload engine with instant ₹500 voucher reward", table_cell_style),
            Paragraph("₹40,000", table_cell_right),
        ],
        [
            Paragraph("<b>4. Gap-Free Cart Drawer & Checkout Engine</b>", table_cell_bold),
            Paragraph("• Milestone rewards progress bar with live unlockable gifts<br/>• 3 curated 1-click companion add-ons (+₹699 refill pack, ₹199 3M mount, ₹499 jar)<br/>• 6-digit Indian PIN delivery & COD validator with BlueDart Air ETA<br/>• Instant ₹100 prepaid UPI discount & 4-pillar trust guarantee badges", table_cell_style),
            Paragraph("₹40,000", table_cell_right),
        ],
    ]

    phase1_table = Table(phase1_data, colWidths=[150, 290, 100])
    phase1_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), graphite_color),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    elements.append(phase1_table)

    # Page Break to Page 2
    elements.append(PageBreak())

    # ==========================================
    # PAGE 2: SECURITY AUTH, AI RAG, RIVAL PARITY, TOTALS & APPROVALS
    # ==========================================

    # Page 2 Mini Header
    p2_header_data = [
        [
            Paragraph("<b>AURELLE</b> • COMMERCIAL QUOTATION (PAGE 2 OF 2)", ParagraphStyle('P2H', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=graphite_color)),
            Paragraph("<b>REF:</b> QTN-AUR-2026-V3-ENTERPRISE", table_cell_right)
        ]
    ]
    p2_header_table = Table(p2_header_data, colWidths=[350, 190])
    p2_header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    elements.append(p2_header_table)
    elements.append(HRFlowable(width="100%", thickness=1, color=gold_color, spaceBefore=2, spaceAfter=8))

    elements.append(Paragraph("ITEMIZED DELIVERABLES — PHASE II: SECURITY, AI CONCIERGE & RIVAL PARITY", h2_style))
    elements.append(Spacer(1, 3))

    phase2_data = [
        [
            Paragraph("SCOPE MODULE", table_header_style),
            Paragraph("TECHNICAL SPECIFICATION & KEY DELIVERABLES", table_header_style),
            Paragraph("EST. VALUE (INR)", table_header_style),
        ],
        [
            Paragraph("<b>5. High-Security Enterprise Authentication Portal</b>", table_cell_bold),
            Paragraph("• Senior Security Engineer defense implementation:<br/>  - 1-Click Google OAuth & Apple FaceID/TouchID biometric authentication<br/>  - +91 Mobile OTP verification system with demo/production switch<br/>  - Brute-force rate limiting defense: 3 failed attempts lockout (60s timer)<br/>  - Real-time password entropy calculation (Weak to Ironclad Encrypted)<br/>  - Client-side XSS injection sanitization & SOC-2 / India DPDP Act compliance", table_cell_style),
            Paragraph("₹35,000", table_cell_right),
        ],
        [
            Paragraph("<b>6. Aurelle AI RAG Concierge System</b>", table_cell_bold),
            Paragraph("• Retrieval-Augmented Generation across 7 authoritative technical dossiers:<br/>  - Surface safety (Kohler, TOTO, Jaquar non-scratch verification)<br/>  - NABL certified chemistry pathogen elimination (99.9% kill rate)<br/>  - Hardware CAD specs, BlueDart COD logistics, and Privé VIP rules<br/>• Real source citations, interactive action cards (Add to cart, VIP ₹200 off)<br/>• Embedded in-product AI search bar ('Ask Jify' rival equivalent)", table_cell_style),
            Paragraph("₹30,000", table_cell_right),
        ],
        [
            Paragraph("<b>7. Rival Parity & Auto-Ship Refill Subscriptions</b>", table_cell_bold),
            Paragraph("• Real-time stock urgency banner: '🔥 18 shoppers viewing now • Only 9 kits left'<br/>• Recurring auto-ship subscription toggle (-15% discount on refills)<br/>• Flexible refill frequencies (30, 60, or 90 days) with WhatsApp 1-tap pause/cancel", table_cell_style),
            Paragraph("₹15,000", table_cell_right),
        ],
        [
            Paragraph("<b>8. Edge Deployment, Vercel Production & Handover</b>", table_cell_bold),
            Paragraph("• Clean build: 0 TypeScript & 0 lint errors across 1,924 modules<br/>• Instant production deployment on Vercel Edge Network with SSL encryption<br/>• Main branch repository synchronisation to GitHub (krish2105/Siddhi-website)", table_cell_style),
            Paragraph("₹15,000", table_cell_right),
        ],
        [
            Paragraph("<b>STANDARD TOTAL VALUE</b>", table_cell_bold),
            Paragraph("Complete 8-Module Turnkey Enterprise Flagship Platform", table_cell_style),
            Paragraph("<b>₹2,45,000</b>", table_cell_right),
        ],
        [
            Paragraph("<b>EXCLUSIVE RAPID SIGN-OFF DISCOUNT</b>", table_cell_bold),
            Paragraph("Special preferred pre-launch commercial credit for prompt agreement", table_cell_style),
            Paragraph("<font color='#2F7D6B'><b>- ₹30,000</b></font>", table_cell_right),
        ],
        [
            Paragraph("<b>FINAL NET COMMERCIAL INVESTMENT</b>", table_header_style),
            Paragraph("<b>Fully Built, Deployed & Monetization-Ready Flagship E-Commerce Store</b>", table_header_style),
            Paragraph("<b>₹2,15,000 INR</b>", table_header_style),
        ],
    ]

    phase2_table = Table(phase2_data, colWidths=[150, 290, 100])
    phase2_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), graphite_color),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('GRID', (0,0), (-1,-3), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('BACKGROUND', (0,-3), (-1,-3), light_bg),
        ('BACKGROUND', (0,-2), (-1,-2), light_bg),
        ('BACKGROUND', (0,-1), (-1,-1), graphite_color),
        ('LINEBELOW', (0,-1), (-1,-1), 2, gold_color),
    ]))
    elements.append(phase2_table)
    elements.append(Spacer(1, 8))

    # 5. Milestone Payment Terms
    terms_content = [
        Paragraph("<b>MILESTONE PAYMENT SCHEDULE (7-DAY TURNAROUND):</b>", h2_style),
        Paragraph("• <b>50% Upfront Kickoff (₹1,07,500 INR):</b> Upon commercial confirmation and project agreement.<br/>• <b>30% Beta Milestone (₹64,500 INR):</b> Upon review of 3D WebGL studio, video reels, auth portal & AI concierge.<br/>• <b>20% Final Handover (₹43,000 INR):</b> Upon live deployment to Vercel and transfer of GitHub repository ownership.", body_style),
        Spacer(1, 4),
        Paragraph("<b>ACCEPTED PAYMENT MODES:</b> Direct Bank NEFT / RTGS / IMPS / Instant UPI (GPay, PhonePe, Paytm)", body_style),
    ]
    elements.append(KeepTogether(terms_content))
    elements.append(Spacer(1, 8))

    # 6. Formal Sign-Off Table
    sign_data = [
        [
            Paragraph("<b>PROPOSED BY:</b><br/><br/>_____________________________________<br/><b>Krishna Mathur</b><br/>Lead Creative Technologist & Senior Full-Stack Engineer<br/>Date: 25/09/2026", body_style),
            Paragraph("<b>ACCEPTED & CONFIRMED BY (CLIENT):</b><br/><br/>_____________________________________<br/><b>Authorized Representative</b><br/>Aurelle / Siddhi Website<br/>Date: ________________________", body_style),
        ]
    ]
    sign_table = Table(sign_data, colWidths=[270, 270])
    sign_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('BACKGROUND', (0,0), (-1,-1), light_bg),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    elements.append(sign_table)

    doc.build(elements)
    print(f"Quotation PDF generated successfully: {filename}")

if __name__ == "__main__":
    build_pdf()

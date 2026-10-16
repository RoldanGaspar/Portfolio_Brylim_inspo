let cyberLabAnimId = null;
let cyberLabResizeHandler = null;

function renderCyberLab() {
    const lab = portfolioData.cyberLab;
    if (!lab) return '';

    const activeRulesCount = lab.defenseRules.filter(r => r.active).length;

    return `
        <div class="cyber-lab-page reveal">
            <div class="page-header-clean">
                <span class="section-number">08 &mdash; cyberops simulator</span>
                <h2 class="page-title-clean">cyber lab</h2>
                <p class="page-desc-clean">${lab.subtitle}</p>
                <div class="cyber-foundations-bar">
                    <span class="cyber-foundation-label"><i class="ph-fill ph-seal-check"></i> VERIFIED NETACAD FOUNDATIONS:</span>
                    ${lab.verifiedFoundations.map(f => `<button class="cyber-foundation-pill" data-foundation="${f}" type="button">${f}</button>`).join('')}
                    <a href="#/certifications" class="cyber-verify-link">Verify 10 Credentials &rarr;</a>
                </div>
            </div>

            <!-- Telemetry Metrics Bar -->
            <div class="cyber-metrics-grid">
                <div class="cyber-metric-card">
                    <span class="cyber-metric-label">PACKETS INSPECTED</span>
                    <strong class="cyber-metric-value" id="cyber-stat-inspected">1,024</strong>
                    <span class="cyber-metric-sub">Deep Packet Engine</span>
                </div>
                <div class="cyber-metric-card">
                    <span class="cyber-metric-label">THREATS MITIGATED</span>
                    <strong class="cyber-metric-value accent" id="cyber-stat-blocked">42</strong>
                    <span class="cyber-metric-sub">Dropped at Perimeter</span>
                </div>
                <div class="cyber-metric-card">
                    <span class="cyber-metric-label">BREACH EVENTS</span>
                    <strong class="cyber-metric-value" id="cyber-stat-breaches">0</strong>
                    <span class="cyber-metric-sub">Unfiltered Payloads</span>
                </div>
                <div class="cyber-metric-card">
                    <span class="cyber-metric-label">DEFENSE POSTURE</span>
                    <strong class="cyber-metric-value" id="cyber-stat-posture">${activeRulesCount}/${lab.defenseRules.length} ACTIVE</strong>
                    <span class="cyber-metric-sub" id="cyber-stat-status">ZERO-TRUST ENFORCED</span>
                </div>
            </div>

            <!-- Interactive Network Topology Canvas Card -->
            <section class="cyber-canvas-card" aria-label="Network Topology Simulator">
                <div class="cyber-canvas-header">
                    <div class="cyber-canvas-title-group">
                        <span class="cyber-live-dot" id="cyber-live-dot"></span>
                        <span class="cyber-canvas-title">LIVE TOPOLOGY &bull; SPAN PORT MIRROR (eth0 &rarr; vlan10/20/30)</span>
                    </div>
                    <div class="cyber-canvas-legend">
                        <span class="legend-item"><i class="legend-dot normal"></i> TLS Traffic</span>
                        <span class="legend-item"><i class="legend-dot threat"></i> Attack Vector</span>
                        <span class="legend-item"><i class="legend-dot blocked"></i> IPS Drop</span>
                    </div>
                </div>

                <div class="cyber-canvas-wrap">
                    <canvas id="cyber-topology-canvas" width="820" height="340" aria-label="Interactive network topology diagram"></canvas>
                </div>

                <!-- Selected Node Inspector Bar -->
                <div class="cyber-node-inspector" id="cyber-node-inspector">
                    <div class="inspector-badge">
                        <i class="ph-fill ph-hard-drives"></i>
                        <span id="inspector-node-name">Perimeter IDS/FW</span>
                    </div>
                    <div class="inspector-meta-list">
                        <span><strong>IP:</strong> <code id="inspector-node-ip">10.0.0.1</code></span>
                        <span><strong>ROLE:</strong> <span id="inspector-node-role">Stateful Firewall & Snort IPS</span></span>
                        <span><strong>POLICY:</strong> <code id="inspector-node-ports">ACL Policy #104</code></span>
                    </div>
                    <span class="inspector-hint">Click any node on canvas to inspect</span>
                </div>
            </section>

            <!-- Controls & SOC Log 2-Column Grid -->
            <div class="cyber-bottom-grid">
                <!-- Left Column: Threat Simulator + Active Defense Matrix -->
                <div class="cyber-controls-col">
                    <section class="cyber-panel-card">
                        <div class="cyber-panel-header">
                            <h3><i class="ph-fill ph-warning-octagon"></i> THREAT VECTOR SIMULATOR</h3>
                            <span class="cyber-panel-badge">MITRE ATT&amp;CK</span>
                        </div>
                        <p class="cyber-panel-desc">Inject synthetic attack payloads from the WAN edge to test perimeter IPS rules in real time.</p>
                        <div class="cyber-threat-buttons">
                            ${lab.threatScenarios.map(t => `
                                <button class="cyber-threat-btn" data-threat="${t.id}" aria-label="Simulate ${t.label}">
                                    <div class="threat-btn-top">
                                        <span class="threat-btn-name">${t.label}</span>
                                        <span class="threat-mitre-tag">${t.mitre}</span>
                                    </div>
                                    <span class="threat-btn-proto">${t.protocol} &rarr; target: ${t.target.toUpperCase()}</span>
                                </button>
                            `).join('')}
                        </div>
                    </section>

                    <section class="cyber-panel-card">
                        <div class="cyber-panel-header">
                            <h3><i class="ph-fill ph-shield-check"></i> ACTIVE IPS / FIREWALL RULES</h3>
                            <button class="cyber-reset-btn" id="cyber-restore-rules-btn" aria-label="Restore all defense rules">Enable All</button>
                        </div>
                        <p class="cyber-panel-desc">Toggle rules off and launch an attack above to observe unmitigated packet penetration.</p>
                        <div class="cyber-rules-list">
                            ${lab.defenseRules.map(r => `
                                <div class="cyber-rule-item ${r.active ? 'active' : 'disabled'}" data-rule="${r.id}">
                                    <div class="rule-info">
                                        <div class="rule-title-row">
                                            <strong class="rule-name">${r.label}</strong>
                                            <code class="rule-code">${r.code}</code>
                                        </div>
                                        <p class="rule-desc">${r.desc}</p>
                                    </div>
                                    <button class="cyber-rule-toggle ${r.active ? 'on' : ''}" data-rule-toggle="${r.id}" aria-label="Toggle ${r.label}" aria-pressed="${r.active}">
                                        <span class="toggle-knob"></span>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                </div>

                <!-- Right Column: Live SIEM / SOC Telemetry Feed -->
                <section class="cyber-panel-card cyber-log-card" aria-label="Live Security Operations Log">
                    <div class="cyber-panel-header">
                        <h3><i class="ph-fill ph-terminal-window"></i> SIEM INTRUSION TELEMETRY</h3>
                        <button class="cyber-reset-btn" id="cyber-clear-log-btn" aria-label="Clear telemetry log">Clear Log</button>
                    </div>
                    <div class="cyber-log-stream" id="cyber-log-stream" role="log" aria-live="polite"></div>
                </section>
            </div>
        </div>
    `;
}

function initCyberLabEvents() {
    const canvas = document.getElementById('cyber-topology-canvas');
    if (!canvas) return;

    const lab = portfolioData.cyberLab;
    if (!lab) return;

    if (cyberLabAnimId) {
        cancelAnimationFrame(cyberLabAnimId);
        cyberLabAnimId = null;
    }
    if (cyberLabResizeHandler) {
        window.removeEventListener('resize', cyberLabResizeHandler);
        cyberLabResizeHandler = null;
    }

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let inspectedCount = 1024;
    let blockedCount = 42;
    let breachCount = 0;
    let selectedNodeId = 'fw';

    const ruleState = {};
    lab.defenseRules.forEach(r => {
        ruleState[r.id] = r.active;
    });

    const packets = [];
    const ripples = [];
    let nodePositions = [];

    const statInspectedEl = document.getElementById('cyber-stat-inspected');
    const statBlockedEl = document.getElementById('cyber-stat-blocked');
    const statBreachesEl = document.getElementById('cyber-stat-breaches');
    const statPostureEl = document.getElementById('cyber-stat-posture');
    const statStatusEl = document.getElementById('cyber-stat-status');
    const logStreamEl = document.getElementById('cyber-log-stream');

    function appendSocLog(level, tag, message) {
        if (!logStreamEl) return;
        const row = document.createElement('div');
        row.className = 'cyber-log-entry ' + level;

        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];

        const timeSpan = document.createElement('span');
        timeSpan.className = 'log-time';
        timeSpan.textContent = timeStr;

        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'log-badge ' + level;
        badgeSpan.textContent = tag;

        const msgSpan = document.createElement('span');
        msgSpan.className = 'log-msg';
        msgSpan.textContent = message;

        row.appendChild(timeSpan);
        row.appendChild(badgeSpan);
        row.appendChild(msgSpan);

        logStreamEl.prepend(row);
        while (logStreamEl.children.length > 35) {
            logStreamEl.removeChild(logStreamEl.lastChild);
        }
    }

    function updateTelemetryDOM() {
        if (statInspectedEl) statInspectedEl.textContent = inspectedCount.toLocaleString();
        if (statBlockedEl) statBlockedEl.textContent = blockedCount.toLocaleString();
        if (statBreachesEl) {
            statBreachesEl.textContent = String(breachCount);
            statBreachesEl.classList.toggle('danger', breachCount > 0);
        }
        const activeCount = Object.values(ruleState).filter(Boolean).length;
        const totalCount = lab.defenseRules.length;
        if (statPostureEl) statPostureEl.textContent = activeCount + '/' + totalCount + ' ACTIVE';
        if (statStatusEl) {
            if (activeCount === totalCount) {
                statStatusEl.textContent = 'ZERO-TRUST ENFORCED';
            } else if (activeCount >= 2) {
                statStatusEl.textContent = 'PARTIAL EXPOSURE';
            } else {
                statStatusEl.textContent = 'CRITICAL PERIMETER GAP';
            }
        }
    }

    function updateInspectorDOM(node) {
        if (!node) return;
        const nameEl = document.getElementById('inspector-node-name');
        const ipEl = document.getElementById('inspector-node-ip');
        const roleEl = document.getElementById('inspector-node-role');
        const portsEl = document.getElementById('inspector-node-ports');
        if (nameEl) nameEl.textContent = node.label;
        if (ipEl) ipEl.textContent = node.ip;
        if (roleEl) roleEl.textContent = node.role;
        if (portsEl) portsEl.textContent = node.ports;
    }

    function computeNodeLayout(width, height) {
        const isCompact = width < 560;
        const padX = isCompact ? 46 : 78;
        const usableW = width - padX * 2;
        const centerY = height / 2;
        const laneOffset = isCompact ? Math.min(82, height * 0.28) : Math.min(98, height * 0.31);

        nodePositions = lab.nodes.map(n => {
            let x = padX + (n.tier / 3) * usableW;
            let y = centerY;
            if (n.tier === 3 && typeof n.lane === 'number') {
                y = centerY + n.lane * laneOffset;
            }
            return {
                ...n,
                x,
                y,
                r: isCompact ? 18 : 22
            };
        });
    }

    function calibrateCanvasSize() {
        const wrap = canvas.parentElement;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const cssWidth = Math.max(280, Math.floor(rect.width));
        const cssHeight = cssWidth < 520 ? 290 : 340;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = cssWidth * dpr;
        canvas.height = cssHeight * dpr;
        canvas.style.width = cssWidth + 'px';
        canvas.style.height = cssHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        computeNodeLayout(cssWidth, cssHeight);
    }

    function getNodeById(id) {
        return nodePositions.find(n => n.id === id);
    }

    function spawnNormalPacket() {
        const targets = ['web', 'sec', 'db'];
        const targetId = targets[Math.floor(Math.random() * targets.length)];
        packets.push({
            type: 'normal',
            stage: 0,
            progress: 0,
            speed: 0.018 + Math.random() * 0.008,
            targetId,
            mitigatedBy: null,
            label: 'TLS 1.3'
        });
    }

    function spawnThreatBurst(scenario) {
        const burstCount = scenario.id === 'ddos' ? 8 : 4;
        const isBlocked = Boolean(ruleState[scenario.mitigatedBy]);

        for (let i = 0; i < burstCount; i++) {
            packets.push({
                type: 'threat',
                stage: 0,
                progress: -i * 0.16,
                speed: 0.022 + Math.random() * 0.006,
                targetId: scenario.target,
                mitigatedBy: scenario.mitigatedBy,
                willBlock: isBlocked,
                scenario,
                isLead: i === 0
            });
        }

        appendSocLog(
            'warn',
            scenario.mitre,
            'Ingress signature detected: ' + scenario.payload + ' -> ' + scenario.target.toUpperCase()
        );
    }

    // Seed initial SOC telemetry logs
    appendSocLog('info', 'SYS-INIT', 'SPAN port mirror online. Snort IPS signatures v2026.10 loaded.');
    appendSocLog('ok', 'ACL-104', 'Stateful firewall enforcing TLS 1.3 &PostgreSQL RLS isolation.');
    appendSocLog('info', 'OSPF-L3', 'VLAN 10 (App), VLAN 20 (SOC), VLAN 30 (Vault) adjacency established.');

    calibrateCanvasSize();
    cyberLabResizeHandler = () => calibrateCanvasSize();
    window.addEventListener('resize', cyberLabResizeHandler);

    // Canvas Click / Touch Node Selection
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        for (let i = 0; i < nodePositions.length; i++) {
            const node = nodePositions[i];
            const dist = Math.hypot(clickX - node.x, clickY - node.y);
            if (dist <= node.r + 12) {
                selectedNodeId = node.id;
                updateInspectorDOM(node);
                if (window.playSound) playSound('click');
                appendSocLog('info', 'INSPECT', 'Node ' + node.label + ' (' + node.ip + ') — ' + node.ports);
                break;
            }
        }
    });

    // Threat Simulator Buttons
    document.querySelectorAll('.cyber-threat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const threatId = btn.getAttribute('data-threat');
            const scenario = lab.threatScenarios.find(t => t.id === threatId);
            if (!scenario) return;
            if (window.playSound) playSound('open');
            spawnThreatBurst(scenario);
        });
    });

    // Verified NetAcad Foundation Pills
    const foundationNodeMap = {
        'CyberOps Associate': { nodeId: 'sec', note: 'SOC Tier-1 alert triage, SIEM log analysis, and incident response playbooks.' },
        'Ethical Hacker': { nodeId: 'wan', note: 'Reconnaissance, MITRE ATT&CK vector testing, and vulnerability validation.' },
        'Network Defense': { nodeId: 'fw', note: 'Perimeter ASA firewall ACLs, Snort IPS signatures, and stateful inspection.' },
        'Endpoint Security': { nodeId: 'db', note: 'Host hardening, EDR telemetry, and PostgreSQL Row-Level Security isolation.' },
        'Networking Devices & Config': { nodeId: 'sw', note: 'Layer-3 VLAN segmentation, 802.1Q trunking, and OSPF routing tables.' }
    };

    document.querySelectorAll('.cyber-foundation-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const course = pill.getAttribute('data-foundation');
            const mapped = foundationNodeMap[course];
            document.querySelectorAll('.cyber-foundation-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            if (window.playSound) playSound('click');
            if (mapped) {
                selectedNodeId = mapped.nodeId;
                const targetNode = getNodeById(mapped.nodeId);
                updateInspectorDOM(targetNode);
                appendSocLog('info', 'NETACAD', course + ': ' + mapped.note);
            }
        });
    });

    // Defense Rule Toggles
    function syncRuleToggleUI() {
        document.querySelectorAll('.cyber-rule-item').forEach(item => {
            const rId = item.getAttribute('data-rule');
            const active = Boolean(ruleState[rId]);
            item.classList.toggle('active', active);
            item.classList.toggle('disabled', !active);
            const btn = item.querySelector('.cyber-rule-toggle');
            if (btn) {
                btn.classList.toggle('on', active);
                btn.setAttribute('aria-pressed', String(active));
            }
        });
        updateTelemetryDOM();
    }

    document.querySelectorAll('[data-rule-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const rId = btn.getAttribute('data-rule-toggle');
            const ruleObj = lab.defenseRules.find(r => r.id === rId);
            if (!ruleObj) return;
            ruleState[rId] = !ruleState[rId];
            if (window.playSound) playSound('click');
            syncRuleToggleUI();

            if (ruleState[rId]) {
                appendSocLog('ok', 'IPS-RULE', 'Enabled ' + ruleObj.label + ' (' + ruleObj.code + ')');
            } else {
                appendSocLog('danger', 'POLICY-OFF', 'Disabled ' + ruleObj.label + ' — perimeter exposed!');
            }
        });
    });

    const restoreBtn = document.getElementById('cyber-restore-rules-btn');
    if (restoreBtn) {
        restoreBtn.addEventListener('click', () => {
            lab.defenseRules.forEach(r => {
                ruleState[r.id] = true;
            });
            if (window.playSound) playSound('click');
            syncRuleToggleUI();
            appendSocLog('ok', 'ZERO-TRUST', 'All perimeter IPS & firewall rules restored to active enforcement.');
        });
    }

    const clearLogBtn = document.getElementById('cyber-clear-log-btn');
    if (clearLogBtn && logStreamEl) {
        clearLogBtn.addEventListener('click', () => {
            logStreamEl.innerHTML = '';
            if (window.playSound) playSound('click');
            appendSocLog('info', 'SIEM-LOG', 'Telemetry buffer cleared by operator.');
        });
    }

    let frameCounter = 0;

    function renderCanvasFrame() {
        if (!document.body.contains(canvas)) {
            if (cyberLabResizeHandler) {
                window.removeEventListener('resize', cyberLabResizeHandler);
                cyberLabResizeHandler = null;
            }
            return;
        }

        const styles = getComputedStyle(document.documentElement);
        const textColor = styles.getPropertyValue('--text-color').trim() || '#111111';
        const mutedColor = styles.getPropertyValue('--text-muted').trim() || '#666666';
        const cardBg = styles.getPropertyValue('--card-bg').trim() || '#ffffff';
        const borderColor = styles.getPropertyValue('--border-color').trim() || '#e5e5e5';
        const accentBlue = styles.getPropertyValue('--accent-blue').trim() || '#0284c7';
        const accentCyan = styles.getPropertyValue('--accent-cyan').trim() || '#06b6d4';
        const accentViolet = styles.getPropertyValue('--accent-violet').trim() || '#8b5cf6';
        const statusDanger = styles.getPropertyValue('--status-danger').trim() || '#ef4444';

        const width = parseFloat(canvas.style.width) || 820;
        const height = parseFloat(canvas.style.height) || 340;

        ctx.clearRect(0, 0, width, height);

        // Subtle technical grid background
        ctx.save();
        ctx.strokeStyle = borderColor;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1;
        const gridStep = 36;
        for (let gx = gridStep; gx < width; gx += gridStep) {
            ctx.beginPath();
            ctx.moveTo(gx, 0);
            ctx.lineTo(gx, height);
            ctx.stroke();
        }
        for (let gy = gridStep; gy < height; gy += gridStep) {
            ctx.beginPath();
            ctx.moveTo(0, gy);
            ctx.lineTo(width, gy);
            ctx.stroke();
        }
        ctx.restore();

        const wan = getNodeById('wan');
        const fw = getNodeById('fw');
        const sw = getNodeById('sw');
        const targets = ['web', 'sec', 'db'].map(id => getNodeById(id)).filter(Boolean);

        // Draw topology links
        function drawLink(a, b) {
            if (!a || !b) return;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 2.2;
            ctx.stroke();
            ctx.restore();
        }

        drawLink(wan, fw);
        drawLink(fw, sw);
        targets.forEach(t => drawLink(sw, t));

        // Firewall security perimeter zone line
        if (fw) {
            const allRulesOn = Object.values(ruleState).every(Boolean);
            ctx.save();
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(fw.x, 18);
            ctx.lineTo(fw.x, height - 18);
            ctx.strokeStyle = allRulesOn ? accentCyan : accentViolet;
            ctx.globalAlpha = 0.45;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        }

        // Spawn ambient TLS packets periodically
        frameCounter++;
        if (!prefersReducedMotion && frameCounter % 52 === 0 && packets.length < 28) {
            spawnNormalPacket();
        }

        // Update and draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
            const p = packets[i];
            p.progress += prefersReducedMotion ? 0.25 : p.speed;

            if (p.progress < 0) continue;

            let startNode = wan;
            let endNode = fw;
            if (p.stage === 1) {
                startNode = fw;
                endNode = sw;
            } else if (p.stage === 2) {
                startNode = sw;
                endNode = getNodeById(p.targetId) || sw;
            }

            if (p.progress >= 1) {
                // Transition at node
                if (p.stage === 0) {
                    inspectedCount++;
                    if (p.type === 'threat' && p.willBlock) {
                        blockedCount++;
                        ripples.push({ x: fw.x, y: fw.y, r: 8, maxR: 38, alpha: 0.9, color: accentViolet });
                        if (p.isLead) {
                            if (window.playSound) playSound('click');
                            appendSocLog(
                                'ok',
                                'IPS-DROP',
                                'Blocked ' + p.scenario.label + ' [' + p.scenario.mitre + '] via rule "' + p.mitigatedBy.toUpperCase() + '"'
                            );
                        }
                        updateTelemetryDOM();
                        packets.splice(i, 1);
                        continue;
                    }
                    p.stage = 1;
                    p.progress = 0;
                    updateTelemetryDOM();
                } else if (p.stage === 1) {
                    if (p.targetId === 'sw') {
                        if (p.type === 'threat') {
                            breachCount++;
                            ripples.push({ x: sw.x, y: sw.y, r: 8, maxR: 42, alpha: 1, color: statusDanger });
                            if (p.isLead) {
                                appendSocLog(
                                    'danger',
                                    'BREACH',
                                    'UNMITIGATED ' + p.scenario.label + ' reached Core L3 Switch (rule ' + p.mitigatedBy.toUpperCase() + ' disabled)!'
                                );
                            }
                            updateTelemetryDOM();
                        }
                        packets.splice(i, 1);
                        continue;
                    }
                    p.stage = 2;
                    p.progress = 0;
                } else {
                    const dest = getNodeById(p.targetId);
                    if (p.type === 'threat') {
                        breachCount++;
                        if (dest) {
                            ripples.push({ x: dest.x, y: dest.y, r: 8, maxR: 44, alpha: 1, color: statusDanger });
                        }
                        if (p.isLead) {
                            appendSocLog(
                                'danger',
                                'BREACH',
                                'ALERT: ' + p.scenario.label + ' penetrated ' + (dest ? dest.label : p.targetId) + '!'
                            );
                        }
                        updateTelemetryDOM();
                    }
                    packets.splice(i, 1);
                    continue;
                }
            }

            if (startNode && endNode) {
                const px = startNode.x + (endNode.x - startNode.x) * p.progress;
                const py = startNode.y + (endNode.y - startNode.y) * p.progress;

                ctx.save();
                ctx.beginPath();
                ctx.arc(px, py, p.type === 'threat' ? 5.5 : 4, 0, Math.PI * 2);
                ctx.fillStyle = p.type === 'threat' ? statusDanger : accentBlue;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(px, py, p.type === 'threat' ? 10 : 7, 0, Math.PI * 2);
                ctx.fillStyle = p.type === 'threat' ? 'rgba(239, 68, 68, 0.22)' : 'rgba(56, 189, 248, 0.18)';
                ctx.fill();
                ctx.restore();
            }
        }

        // Draw IPS drop / breach ripples
        for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
            const rp = ripples[rIdx];
            rp.r += 1.6;
            rp.alpha -= 0.04;
            if (rp.alpha <= 0 || rp.r >= rp.maxR) {
                ripples.splice(rIdx, 1);
                continue;
            }
            ctx.save();
            ctx.beginPath();
            ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
            ctx.strokeStyle = rp.color;
            ctx.globalAlpha = Math.max(0, rp.alpha);
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }

        // Draw network nodes
        nodePositions.forEach(node => {
            const isSelected = node.id === selectedNodeId;
            ctx.save();

            if (isSelected) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r + 6, 0, Math.PI * 2);
                ctx.strokeStyle = accentBlue;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            ctx.fillStyle = cardBg;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = node.id === 'fw' ? accentCyan : (isSelected ? accentBlue : borderColor);
            ctx.stroke();

            // Node short code inside circle
            ctx.fillStyle = textColor;
            ctx.font = '700 10px "Space Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.id.toUpperCase(), node.x, node.y);

            // Node label below circle
            ctx.fillStyle = textColor;
            ctx.font = '600 11px "Inter", sans-serif';
            ctx.fillText(node.label, node.x, node.y + node.r + 14);

            // Node IP below label
            ctx.fillStyle = mutedColor;
            ctx.font = '400 9.5px "Space Mono", monospace';
            ctx.fillText(node.ip, node.x, node.y + node.r + 27);

            ctx.restore();
        });

        cyberLabAnimId = requestAnimationFrame(renderCanvasFrame);
    }

    cyberLabAnimId = requestAnimationFrame(renderCanvasFrame);
}

window.renderCyberLab = renderCyberLab;
window.initCyberLabEvents = initCyberLabEvents;

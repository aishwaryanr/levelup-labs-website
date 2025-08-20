// Simple notes modal functionality
console.log('Notes modal script loaded');

// Notes data
const notesData = {
    'gajen-notes': {
        title: 'Gajen Kandiah - Driving AI Strategy for Fortune-Scale Companies',
        notes: [
            'Break down business processes to "atomic level" and strategically place AI where it creates maximum value',
            'Use RAID framework: 6-week AI project cycles with clear scalability assessment and go/no-go decisions',
            'Shift from annual to 3-6 month strategy cycles - "Experiment. Measure. Adapt."',
            'Transform AI from cost-saving tool to growth engine that unlocks new revenue streams',
            'AI strategy must be rooted in core business strategy, not technology-first thinking',
            'Avoid "bolting AI onto broken systems" - redesign processes from the core',
            'Focus on creating customer value, not just internal efficiency gains',
            'Social media shoutouts by <a href="https://www.linkedin.com/posts/iskriyanavasileva_chaiandai-problemfirstapproach-chaiandai-activity-7337520992610672641-h273/" target="_blank">Iskriyana Vasileva</a> & <a href="https://www.linkedin.com/posts/garywong_big-thanks-to-aishwarya-naresh-reganti-kiriti-activity-7337871104130039808-rltt/" target="_blank">Gary Wong</a>'
        ]
    },
    'gabriel-notes': {
        title: 'Gabriel Almeida - Building a Wildly Successful AI Startup in 2025',
        notes: [
            'Build focused, modular AI agents instead of trying to create an all-knowing "Jarvis"',
            'Iterate fast: "make mistakes every 5 minutes, iterate fast, do one thing well"',
            'Use open source as a strategic launch mechanism, especially for unknown teams',
            'Design flexible infrastructure that allows easy component customization',
            'Solve efficiency challenges, particularly around multi-agent token consumption',
            'Design tools that enable non-technical teams to leverage complex technologies',
            'Focus on integration over building everything in-house (leverage existing platforms)',
            'Start small and specialize rather than attempting comprehensive solutions',
            'Read the full insights: <a href="https://thenuancedperspective.substack.com/p/from-6000-lines-of-code-in-two-days" target="_blank">From 6000 Lines of Code in Two Days</a>'
        ]
    },
    'jyothi-notes': {
        title: 'Jyothi Nookula - The AI PM Hype & Building AI-Native Products in 2025',
        notes: [
            'Define AI-native as products "where AI is the core capability and everything else is designed around it"',
            'Start with user problems, not "where can I slap AI" - problem-first thinking is crucial',
            'PMs don\'t need to code - that\'s a myth, focus on understanding AI limits and boundaries',
            'Need thousands of data rows for meaningful AI implementation',
            'Three key AI applications: automation, personalization, and augmentation',
            'Create practical checklists with data patterns and low-risk implementations',
            'Avoid over-technical interview preparation - focus on product fundamentals',
            'Read the full discussion: <a href="https://thenuancedperspective.substack.com/p/what-product-leaders-at-netflix-and" target="_blank">What Product Leaders at Netflix and Meta Know</a>'
        ]
    },
    'francisco-notes': {
        title: 'Francisco D\'souza - Leading Through Uncertainty & The Future of AI-Enabled Services',
        notes: [
            'Create multiple options when facing uncertainty - avoid betting on one path until clarity emerges',
            'Use portfolio approach: make several bets, trim the losers, double down on winners',
            'AI will transform the entire services industry - virtually no service will escape automation',
            'Future services model = hybrid of traditional services + SaaS + 10-30% revenue spent on R&D',
            'Need higher gross margins than traditional services to fund continuous technology development',
            'Palantir shows the way: high-touch services combined with proprietary tech platform',
            'Scaled Cognizant from startup to $16B revenue with 282K employees through multiple tech waves',
            'Now investing in established services businesses through Recognize private equity firm',
            'Services companies at top of stack face maximum disruption - must transform proactively'
        ]
    },
    'jaya-notes': {
        title: 'Jaya Gupta - The Future of Services Software & What VCs Actually Look For',
        notes: [
            'Services software finally viable with LLMs - automate complete human workflows, not just individual tasks',
            'Forward-deployed engineering is the secret weapon - custom implementation creates unbreakable pricing power',
            'Usage-based pricing wins over outcome-based pricing in real AI startup implementations',
            'AI unicorn pattern: 80% founded by people under 32 - IC-level knowledge beats management experience',
            'Healthcare goldmine: 80-90% automation possible in back-office workflows like infusion clinics and Epic integration',
            'Underexplored opportunities: direct procurement, supply chain workflows, order entry automation',
            'Scaling challenge: how to grow forward-deployed engineering teams without losing quality',
            'Foundation Capital thesis: $1-15M checks for workflow automation over general-purpose tools',
            'Competitive moat = quality + edge case handling through intensive custom engineering work'
        ]
    },
    'vikash-notes': {
        title: 'Vikash Rungta - The AI PM Hype & Building AI-Native Products in 2025',
        notes: [
            'Highlight the shift from deterministic to probabilistic outputs in AI products',
            'Frame product decisions as trade-offs between precision and breadth of capabilities',
            'Use "SSR" framework: Skills, Signal, and Reach for AI product decisions',
            'Focus on "managing non-determinism" as a core PM skill in AI products',
            'Emphasize communicating learned skills and solution spaces quickly',
            'Explore your product\'s "latent value" through AI capabilities',
            'Create parallel tracks of AI experimentation to reduce risk',
            'Understand solution spaces quickly rather than getting stuck in analysis',
            'Read the full discussion: <a href="https://thenuancedperspective.substack.com/p/what-product-leaders-at-netflix-and" target="_blank">What Product Leaders at Netflix and Meta Know</a>'
        ]
    }
};

// Global functions
function openNotesModal(notesId) {
    console.log('openNotesModal called with:', notesId);
    console.log('Available notes keys:', Object.keys(notesData));
    const notesModal = document.getElementById('notes-modal');
    const modalContent = document.getElementById('modal-notes-content');
    const data = notesData[notesId];
    
    console.log('Modal element:', notesModal);
    console.log('Data found:', data);
    
    if (data && notesModal && modalContent) {
        modalContent.innerHTML = `
            <h3>${data.title}</h3>
            <ul>
                ${data.notes.map(note => `<li>${note}</li>`).join('')}
            </ul>
        `;
        notesModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Modal should be visible now');
    } else {
        console.error('Missing elements or data:', { data, notesModal, modalContent });
    }
}

function closeNotesModal() {
    console.log('closeNotesModal called');
    const notesModal = document.getElementById('notes-modal');
    if (notesModal) {
        notesModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready, setting up notes modal listeners');
    
    // Set up click listeners
    const notesButtons = document.querySelectorAll('.view-notes-btn');
    console.log('Found notes buttons:', notesButtons.length);
    
    notesButtons.forEach(button => {
        button.addEventListener('click', function() {
            const notesId = this.getAttribute('data-notes-id');
            console.log('Notes button clicked, ID:', notesId);
            openNotesModal(notesId);
        });
    });
    
    // Set up close listeners
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNotesModal);
    }
    
    // Close on outside click
    const notesModal = document.getElementById('notes-modal');
    if (notesModal) {
        notesModal.addEventListener('click', function(e) {
            if (e.target === notesModal) {
                closeNotesModal();
            }
        });
    }
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const notesModal = document.getElementById('notes-modal');
            if (notesModal && notesModal.style.display === 'block') {
                closeNotesModal();
            }
        }
    });
});
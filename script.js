
        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark')) {
                body.classList.remove('dark');
                body.classList.add('light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                body.classList.remove('light');
                body.classList.add('dark');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Tab Navigation
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Show corresponding content
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Project Filtering
        const filterButtons = document.querySelectorAll('.filter-button');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Chatbot Toggle
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotWindow = document.getElementById('chatbot-window');

        chatbotToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing when clicking the toggle
            chatbotWindow.style.display =
                chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
        });

        // Hide chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (
                chatbotWindow.style.display === 'flex' &&
                !chatbotWindow.contains(e.target) &&
                e.target !== chatbotToggle
            ) {
                chatbotWindow.style.display = 'none';
            }
        });

        // Chatbot Functionality
        const chatbotMessages = document.getElementById('chatbot-messages');
        const chatbotInput = document.getElementById('chatbot-input');
        const sendMessage = document.getElementById('send-message');

        // Enhanced predefined responses with more detailed information
        const responses = {
            'hello': 'Hello there! I\'m Bhart Shukla\'s AI assistant. It\'s great to connect with you! I can tell you all about his work, projects, and experience. What would you like to know?',
            'hi': 'Hi! Thanks for stopping by. I\'m here to share information about Bhart Shukla - his work as a developer, his startup, and his achievements. What interests you most?',
            'hey': 'Hey! Welcome to Bhart\'s portfolio. I\'m excited to tell you about his journey in tech and AI. Where should we start?',

            'who are you': 'I\'m Bhart Shukla\'s AI assistant! He created me to help visitors learn about his work as a full-stack developer, AI researcher, and founder of XBzin Ecosystem.',
            'what do you do': 'I help people discover Bhart\'s skills, projects, and experience. Think of me as your friendly guide to understanding his professional journey and capabilities.',

            'work': 'Bhart is currently working as a Full-Stack Developer while also running his startup XBzin Ecosystem. He specializes in building responsive web applications and AI-powered solutions. He\'s particularly passionate about creating technology that solves real-world problems.',
            'experience': 'Bhart has quite diverse experience! He\'s been freelancing since 2023, completing over 15 projects. In 2024, he founded XBzin Ecosystem and also worked on AI research focusing on healthcare applications. He loves tackling challenges across both frontend and backend development.',

            'projects': 'Bhart has worked on some really interesting projects! His current focus is CropGuard AI - an intelligent farming assistant. He\'s also built interactive portfolios with GSAP animations, real-time chat applications, and full e-commerce platforms. Each project reflects his passion for practical, user-friendly technology.',
            'cropguard': 'CropGuard AI is one of Bhart\'s passion projects! It\'s an AI-powered farming assistant that helps farmers make data-driven decisions about crops, yields, and fertilizers. He\'s building it using core JavaScript and APIs to make it accessible and effective.',

            'skills': 'Bhart has built a strong technical foundation! He\'s advanced in JavaScript, HTML, and CSS, with solid experience in React, Node.js, and database management. He also enjoys working with animation libraries like GSAP and has been strengthening his Java and algorithms knowledge.',
            'technologies': 'His tech stack includes modern web technologies like React, Node.js, MongoDB, and SQL databases. He\'s also experienced with tools like Git, Chrome DevTools, and Google Cloud. Recently, he\'s been exploring ThreeJS for 3D web experiences.',

            'education': 'Bhart is currently pursuing his Bachelor\'s in Computer Application at Amity University, Lucknow, with an impressive 9+ CGPA. What\'s really cool is how he balances academics with hands-on project work - he believes in learning by building real applications.',
            'college': 'He\'s at Amity University, Lucknow, studying Computer Applications. Despite being a student, he\'s already delivering professional projects and running a startup, which shows his dedication and practical approach to learning.',

            'contact': 'You can reach Bhart through multiple channels! WhatsApp: +91 9771748122, LinkedIn: Bhart Shukla, GitHub: @BhartShukla, or email: itsmebhsh@gmail.com. He\'s always open to discussing interesting projects or collaborations.',
            'hire': 'Bhart is available for freelance projects and collaborations! He specializes in full-stack development, AI solutions, and project consulting. You can contact him via WhatsApp, LinkedIn, or email to discuss your project needs.',
            'collaborate': 'That\'s awesome! Bhart loves collaborating on meaningful projects. He brings expertise in web development, AI solutions, and project management. Reach out to him directly - he\'s particularly interested in projects that combine technology with social impact.',

            'xbzin': 'XBzin Ecosystem is Bhart\'s startup that he launched recently! It\'s focused on providing AI tools, research solutions, and digital services. The platform aims to make advanced technology more accessible while driving innovation across different industries.',
            'startup': 'XBzin Ecosystem represents Bhart\'s vision of empowering innovation through technology. It offers various services including web development, AI solutions, and digital tools - all designed to help businesses and individuals leverage technology effectively.',

            'ai': 'Bhart is deeply interested in artificial intelligence and its practical applications. His work includes AI research in healthcare, developing farming assistants like CropGuard AI, and exploring how AI can solve everyday challenges. He believes in ethical, human-centered AI development.',
            'research': 'Bhart has conducted meaningful AI research, particularly in healthcare applications. He\'s worked on projects involving data analysis and predictive modeling to improve healthcare outcomes. His approach combines technical expertise with real-world problem-solving.',

            'freelance': 'Bhart has an impressive freelance track record with over 15 completed projects! He works across the entire stack - from designing responsive frontends to building robust backends. His clients appreciate his attention to detail and commitment to delivering quality solutions.',
            'services': 'Bhart offers several services: custom web development, end-to-end project development, logo design, and AI-based solutions. Each service reflects his philosophy of combining technical excellence with creative problem-solving.',

            'achievements': 'Bhart has achieved quite a lot in a short time! Some highlights: building a startup that reached 1000+ users, receiving an innovation award for his mental health AI system, publishing research, earning Google Cloud certification, and mentoring other developers. He believes in continuous growth and sharing knowledge.',
            'awards': 'Bhart received the "Innovation Excellence" award for his AI-driven mental health monitoring system - a project that demonstrates his commitment to technology that makes a positive impact on people\'s lives.',

            'blog': 'Bhart shares his insights through blog posts! He\'s written about project development methodologies and the relationship between AI and humanity. His writing reflects his thoughtful approach to technology and its role in society.',

            'focus': 'Bhart is currently focused on becoming a stronger full-stack developer while growing XBzin Ecosystem. He\'s deepening his Java and algorithms knowledge and continues to work on AI projects that address real-world challenges in agriculture and healthcare.',
            'goals': 'Bhart aims to keep building technology that matters - solutions that are not just technically sound but also socially relevant. He\'s passionate about mentoring others and contributing to the tech community while expanding his startup\'s impact.',

            'hobbies': 'While Bhart is deeply passionate about technology, he also believes in maintaining balance. When he\'s not coding or working on his startup, he enjoys learning about new tech trends, contributing to open-source projects, and exploring how technology can create positive social change.',

            'default': 'I\'d love to help, but I\'m not sure I understood that. You can ask me about Bhart\'s work experience, technical skills, projects like CropGuard AI, his startup XBzin, education, or how to contact him. What would you like to know?',
            'help': 'I can tell you about: Bhart\'s work and experience, technical skills and projects, education journey, startup XBzin Ecosystem, achievements, or how to get in touch with him. Just ask me anything that interests you!'
        };
        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
            messageDiv.textContent = message;
            chatbotMessages.appendChild(messageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }

        function getResponse(message) {
            const lowerMessage = message.toLowerCase();

            for (const [key, value] of Object.entries(responses)) {
                if (lowerMessage.includes(key)) {
                    return value;
                }
            }

            return responses['default'];
        }

        sendMessage.addEventListener('click', () => {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatbotInput.value = '';

                // Simulate thinking delay
                setTimeout(() => {
                    const response = getResponse(message);
                    addMessage(response);
                }, 500);
            }
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage.click();
            }
        });

        // Initialize visitor count from localStorage or random start under 1000
        let visitorCount = localStorage.getItem('visitorCount');

        if (!visitorCount) {
            // Start with a random number between 100 and 999
            visitorCount = Math.floor(Math.random() * 900) + 100;
        } else {
            visitorCount = parseInt(visitorCount);
        }

        // Increment by 1 on new page load
        visitorCount += 1;

        // Save updated count in localStorage
        localStorage.setItem('visitorCount', visitorCount);

        // Display on the page
        document.getElementById('visitor-count').textContent = visitorCount;

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe project cards and timeline items
        document.querySelectorAll('.project-card, .timeline-item, .skill-item').forEach(el => {
            observer.observe(el);
        });

        // Initialize GSAP animations
        gsap.from('.profile-banner', { duration: 1, y: -50, opacity: 0 });
        gsap.from('.twitter-post', { duration: 0.8, y: 20, opacity: 0, stagger: 0.2 });

        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });

        // Like functionality for achievement posts
        function toggleLike(e) {
            const button = e.currentTarget;
            const postId = button.getAttribute('data-post-id');
            const likeCount = button.querySelector('.like-count');
            const icon = button.querySelector('i');

            if (button.classList.contains('liked')) {
                // Unlike
                button.classList.remove('liked');
                icon.className = 'far fa-heart';
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            } else {
                // Like
                button.classList.add('liked');
                icon.className = 'fas fa-heart';
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            }
        }

        // Add like functionality to all achievement posts
        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', toggleLike);
        });
 
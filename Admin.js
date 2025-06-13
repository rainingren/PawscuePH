// Navigation functionality
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Search functionality
        document.querySelector('.search-box').addEventListener('input', function() {
            console.log('Searching for:', this.value);
        });

        // Pagination functionality
        document.querySelectorAll('.pagination-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (!this.classList.contains('active')) {
                    document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Button hover effects
        document.querySelectorAll('.control-btn, .filter-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
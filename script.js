const userAgent = navigator.userAgent.toLowerCase();
const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
if (isMobile) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => showDescrMobile(e));
    });
    document.querySelector('.container').addEventListener('click', (e) => hideDescrMobile(e));
    function showDescrMobile(e) {
        if (!e.currentTarget.classList.contains('active')) { 
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
        }
    }
    function hideDescrMobile(e) {
        if (e.target.classList.contains('container')) {
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }  
    }
} else {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', (e) => e.currentTarget.classList.add('active'));
        btn.addEventListener('mouseleave', () => hideDescrNotMobile());
    });
    function hideDescrNotMobile() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}





const userAgent = navigator.userAgent.toLowerCase();
const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
if (isMobile) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => showDescrMobile(e));
    });
    document.querySelector('.container').addEventListener('click', (e) => hideDescrMobile(e));
    function showDescrMobile(e) {
        console.log('show');
        if (!e.currentTarget.classList.contains('active')) { 
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // console.log(e.currentTarget);
            e.currentTarget.classList.add('active');
        }
    }
    function hideDescrMobile(e) {
        if (e.target.classList.contains('container')) {
            console.log('hide');
            document.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
        }  
    }
} else {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', (e) => e.currentTarget.classList.add('active'));
        btn.addEventListener('mouseleave', (e) => hideDescrNotMobile(e));
    });
    function hideDescrNotMobile(e) {
        console.log('hideDesk');
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}





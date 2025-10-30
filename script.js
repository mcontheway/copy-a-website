// 微信官网复刻 - JavaScript 交互功能

document.addEventListener('DOMContentLoaded', function() {
    // Android下载按钮点击事件
    const androidDownloadBtn = document.getElementById('android_download');
    const iosDownloadBtn = document.getElementById('ios_download');
    const downloadDialog = document.getElementById('download_dialog');
    const downloadDialogClose = document.getElementById('download_dialog_close');

    if (androidDownloadBtn) {
        androidDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (downloadDialog) {
                downloadDialog.classList.add('download__dialog-wrp_show');
            }
        });
    }

    // 下载对话框关闭按钮
    if (downloadDialogClose) {
        downloadDialogClose.addEventListener('click', function() {
            if (downloadDialog) {
                downloadDialog.classList.remove('download__dialog-wrp_show');
            }
        });
    }

    // 点击遮罩层关闭对话框
    if (downloadDialog) {
        downloadDialog.addEventListener('click', function(e) {
            if (e.target === downloadDialog) {
                downloadDialog.classList.remove('download__dialog-wrp_show');
            }
        });
    }

    // ESC键关闭对话框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && downloadDialog && downloadDialog.classList.contains('download__dialog-wrp_show')) {
            downloadDialog.classList.remove('download__dialog-wrp_show');
        }
    });

    // 平滑滚动效果
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加加载动画
    const body = document.body;
    body.classList.add('loaded');

    // 响应式菜单处理和箭头显示逻辑
    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (width <= 760) {
            body.classList.add('mobile');
            body.classList.remove('desktop');
        } else {
            body.classList.add('desktop');
            body.classList.remove('mobile');
        }

        // 控制向下箭头的显示
        const arrow = document.querySelector('.banner__arrow');
        if (arrow) {
            if (height <= 800) {
                arrow.style.display = 'block';
            } else {
                arrow.style.display = 'none';
            }
        }
    }

    // 初始检查
    handleResize();

    // 窗口大小改变时重新检查
    window.addEventListener('resize', handleResize);

    // 添加一些视觉效果
    const downloadItems = document.querySelectorAll('.banner__download-item');
    downloadItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // 产品服务卡片悬停效果
    const serviceItems = document.querySelectorAll('.links__list li');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('微信官网复刻已加载完成');
});

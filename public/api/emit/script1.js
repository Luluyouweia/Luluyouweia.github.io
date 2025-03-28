// 职位手风琴交互
document.querySelectorAll('.position-item').forEach(item => {
    const header = item.querySelector('.position-header');
    header.addEventListener('click', () => {
        item.classList.toggle('active');
        const icon = header.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

function contact(){
    setTimeout(()=>{
        alert('请联系EMITsubmission@outlook.com邮箱或联系碌鹿悠为')
    },1234)
}

// 浮动动画控制
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    observer.observe(el);
});

// 专属导航栏行为
/*let lastCareerScroll = 0;
const careerNav = document.getElementById('careerNav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastCareerScroll + 50) {
        careerNav.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastCareerScroll - 20) {
        careerNav.style.transform = 'translateY(0)';
    }
    
    lastCareerScroll = currentScroll;
}, { passive: true });*/

// 在script.js中添加以下代码
// 职位数据数组
const positions = [
    {
        title: "文档设计",
        locations: ["沙湾"],
        type: "全职",
        department: "产品设计部门",
        experience: "1人",
        responsibilities: [
            "负责产品文档的设计与排版",
            "主导杂志版面的设计",
            "负责与产品经理吵架"
        ],
        requirements: [
            "精通WPS Office等办公软件的使用。",
            "能够有良好的学习习惯。",
            "有大规模数据处理经验。"
        ],
        applyLink: "#"
    },
    {
        title: "Web前端工程师",
        locations: ["沙湾"],
        type: "全职",
        department: "产品研发部",
        experience: "1人",
        responsibilities: [
            "负责公司官网开发",
            "优化前端性能与用户体验",
            "参与前端架构设计"
        ],
        requirements: [
            "3年以上经验",
            "精通H5,CSS3,JavaScript的技术",
            "有WebGL技术、Vue3开发经历者优先"
        ],
        applyLink: "#"
    },{
        title: "本地化",
        locations: ["沙湾"],
        type: "全职",
        department: "业务部",
        experience: "1人",
        responsibilities: [
            "负责宣传公司产品",
            "推动公司业务全校化发展",
            "推动业务更新",
            "收集客户反馈并积极交流"
        ],
        requirements: [
            "1年以上经验",
            "有良好的沟通能力",
            "有数据分析经验者优先"
        ],
        applyLink: "#"
    }
];

// 职位模板生成函数
function createPositionElement(position) {
    return `
    <div class="position-item">
        <div class="position-header">
            <h3>${position.title}</h3>
            <span class="location-tag">${position.locations.join('/')}</span>
            <div class="position-meta">
                <span class="type-tag">${position.type}</span>
                <span class="dept-tag">${position.department}</span>
            </div>
          
        </div>
        <div class="position-detail">
            <div class="detail-column">
                <h4>职位职责</h4>
                <ul class="responsibility-list">
                    ${position.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-column">
                <h4>任职要求</h4>
                <ul class="requirement-list">
                    ${position.requirements.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
            <div class="detail-action">
                <p class="experience-required">${position.experience}</p>
                <a href="${position.applyLink}" class="apply-btn">立即申请</a>
            </div>
        </div>
    </div>
    `;
}

// 渲染职位列表
function renderPositions() {
    const container = document.getElementById('positionContainer');
    container.innerHTML = positions.map(createPositionElement).join('');
    
    // 重新绑定事件
    document.querySelectorAll('.position-item').forEach(item => {
        const header = item.querySelector('.position-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
            const icon = header.querySelector('i');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });
}

// 初始化渲染
document.addEventListener('DOMContentLoaded', renderPositions);
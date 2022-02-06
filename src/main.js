const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    // { logo: "./images/glogo.png", logoType: 'image', url: "https://github.com/" },
    // { logo: "./images/blogo.png", logoType: 'image', url: "https://www.bilibili.com/" },
    // { logo: "./images/wlogo.png", logoType: 'image', url: "https://weread.qq.com/" },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http//', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close"><img src="./images/close.png"></div>
        </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

//定义一个数组，保存会变的值，这样每次在打开网站时候，直接插入到HTML中就可以
$('.addButton').on('click', () => {
    console.log('点我')
    /* 利用JQuery获取class名字为‘addButton’的标签，并用on给他添加一个
     * 事件click点击事件，如果点击就调用函数*/
    let url = window.prompt('请输入你要添加的网址: ')
    // 全局属性prompt 可以弹出一个交互窗口
    // alert可以弹出一个提示框警告
    if (url.indexOf('http') !== 0) {
        //判读用户输入的网址是否是https开头，如果不是就帮她加上
        url = 'https://' + url
    }
    // const $siteList = $('.siteList')
    // //利用jquery 获取class为siteList的标签 即所有ul组成的数组
    // const $lastLi = $siteList.find('li.last')
    //在siteList中找一个last标签
    // const $li = $(`<li>
    // <a href="${url}">
    //     <div class="site">
    //         <div class="logo">${url[8]}</div>
    //         <div class="link">${url.slice(8, 100)}</div>
    //     </div>
    // </a>
    // </li>`).insertBefore($lastLi)

    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    // $siteList.find('li:not(.last)').removee()
    // hashMap.forEach(node => {
    //     const $li = $(`<li>
    //         <a href="${node.url}">
    //             <div class="site">
    //                 <div class="logo">${node.logo[0]}</div>
    //                 <div class="link">${node.url}</div>
    //             </div>
    //         </a>
    //     </li>`).insertBefore($lastLi)
    // })
    render()
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
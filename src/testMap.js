const map = {
  root: {
    name: '未来科技有限公司',
    avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=103270980,2021432810&fm=58&bpow=550&bpoh=595',
    pic: '王老菊',
    tag: '总公司',
    number: 100,
    children: [
      {
        name: '武装部',
        pic: '二文',
        tag: '黑水',
        number: 20,
        children: [{
          name: '外勤部',
          number: 10,
        }, {
          name: '安保部',
          number: 8,
        }, {
          name: '总务部',
          number: 2,
        }]
      },
      {
        name: '研发部',
        pic: '释放',
        tag: '核心',
        number: 50,
        children: [{
          name: '科学探索部',
          number: 10,
        }, {
          name: '科学研发部',
          number: 20,
        }, {
          name: '基础建设部',
          number: 8,
        }, {
          name: '生产部',
          number: 12,
          children: [{
            name: '网页前端',
            number: 4,
          }, {
            name: '后端',
            number: 5,
          }, {
            name: 'app',
            number: 3,
          }]
        }]
      },
      {
        name: '行政部',
        number: 7,
        children: [{
          name: '总裁办',
          avatar: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=103270980,2021432810&fm=58&bpow=550&bpoh=595',
          number: 1,
          pic: '王老菊'
        }, {
          name: '秘书部',
          number: 4,
          pic: '免免'
        }, {
          name: '财务部',
          number: 2,
          pic: '免免'
        }]
      },
      {
        name: '杂务部',
        number: 23,
        children: [{
          name: '杂务部A',
          number: 2,
        }, {
          name: '杂务部B',
          number: 2,
        }, {
          name: '杂务部C',
          number: 2,
        }, {
          name: '杂务部D',
          number: 2,
        }, {
          name: '杂务部E',
          number: 2,
        }, {
          name: '杂务部F',
          number: 2,
        }, {
          name: '杂务部G',
          number: 9,
          children: [{
            name: '杂务部G-1',
            number: 2,
          }, {
            name: '杂务部G-2',
            number: 2,
          }, {
            name: '杂务部G-3',
            number: 2,
          }, {
            name: '杂务部G-4',
            number: 2,
          }, {
            name: '杂务部G-5',
            number: 1,
          }]
        }, {
          name: '杂务部H',
          number: 2,
        }]
      }
    ]
  }
}

export default map;

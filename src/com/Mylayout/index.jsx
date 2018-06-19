import React from 'react'
import {Layout} from 'antd'
import DataTag from '../DataTag/index.jsx'
import Dishtable from '../Dishtable/index.jsx'
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import {Pie} from 'ant-design-pro/lib/Charts'
import Mymenu from '../Mymenu/index.jsx'

const {Header, Content} = Layout

class Mylayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      orderlist: [],
      orders: [],
      showorders: [],
      orderclo: [],
      location: [],
      selectid: 0,
      dishtable: {},
      dishtype: [],
      typelist: []
    }
    this.getdata = this.getdata.bind(this)
  }
  getdata(id) {
    fetch('/api/loadcyclelist?cid=' + id, {

      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {cid: -1},
      mode: 'cors'
    })
      .then(res => res.json())
      .then(
        result => {
          var col = []
          if (result[1].length > 0) {
            result[1].map((key, value) => {
              key['key'] = value
              return null
            })
            Object.entries(result[1][0]).map((key, value) => {
              if (key[0] !== 'key') {
                if (key[0] === '地点') {
                  col.push({
                    title: key[0],
                    dataIndex: key[0],
                    sorter: true,
                    key: key[0],
                    filters: result[2]
                  })
                } else {
                  col.push({
                    title: key[0],
                    dataIndex: key[0],
                    sorter: true,
                    key: key[0]
                  })
                }
              }
              return null
            })
            var sum = {
              location: {},
              order: {
                total: 0,
                dish: {},
                type: {}
              }
            }
            var lod = {
              地点: '',
              total: 0
            }
            result[4].map((key, value) => {
              if (!sum.order['type'][key['typename']])
                sum.order['type'][key['typename']] = 0
              if (!lod[key['typename']]) {
                lod[key['typename']] = []
                lod[key['typename'] + '份数'] = 0
              }
              if (!sum.order.dish[key['title']])
                sum.order.dish[key['title']] = {total: 0, 类别: {}, 份数: {}}
              sum.order.dish[key['title']]['类别'][key['typename']] = {}
              sum.order.dish[key['title']]['份数'][key['typename'] + '份数'] = 0
              return null;
            })
            result[2].map((key, value) => {
              sum.location[key['text']] = Object.assign(
                {},
                JSON.parse(JSON.stringify(lod))
              )
              sum.location[key['text']]['地点'] = key['text']
              return null;
            })

            result[1].map((key, value) => {
              sum.location[key['地点']][key['类别']].push(key)
              sum.location[key['地点']][key['类别'] + '份数'] += key['数量']
              sum.location[key['地点']]['total'] += key['数量']
              if (
                !sum.order.dish[key['主菜']]['类别'][key['类别']][key['配菜']]
              )
                sum.order.dish[key['主菜']]['类别'][key['类别']][
                  key['配菜']
                ] = 0
              sum.order.dish[key['主菜']]['类别'][key['类别']][key['配菜']] +=
                key['数量']
              sum.order.dish[key['主菜']]['份数'][key['类别'] + '份数'] +=
                key['数量']
              sum.order.dish[key['主菜']].total += key['数量']
              sum.order.total += key['数量']
              sum.order['type'][key['类别']] += key['数量']
              return null;
            })
            sum['starter'] = result[5]
            // result[8].map((key, value) => {
            //   result[7]
            // })
            console.log(sum)
          }
          this.setState({
            isLoaded: true,
            orderlist: result[0],
            orderclo: col,
            orders: result[1],
            showorders: result[1],
            location: result[2],
            selectid: result[6][0].cycle,
            summary: sum,
            dishtable: result[7],
            dishtype: result[9],
            typelist: result[10]
          })
        },
        error => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }
  handleTableChange = (pagination, filters, sorter) => {
    var t = []
    if (filters.地点.length > 0) {
      filters.地点.map((key, value) => {
        t = t.concat(this.state.orders.filter(word => word.地点 === key))
        return null;
      })
    } else {
      t = this.props.state.orders
    }
    if (sorter != null) {
    }
    this.setState({
      showorders: t
    })
  }
  componentDidMount() {
    this.getdata(-1)
  }
  render() {
    const Home = () => (
      <DataTag
        cli={this.getdata}
        state={this.state}
        tablef={this.handleTableChange}
      />
    )
    const mymenu = () => (
      <Dishtable
        data={this.state.dishtable}
        dt={this.state.dishtype}
        typelist={this.state.typelist}
      />
    )
    const abc = () => (
      // <Pie percent={28} subTitle="中式快餐" total="28%" height={140} />
      <div>avb</div>
    )
    return (
      <Router basename={'home'}>
        <Layout>
          <Layout>
            <Header style={{background: '#fff', padding: 0}}>
              <Mymenu />
            </Header>
            <Content
              style={{
                margin: '16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              <Route exact path="/" component={abc} />
              <Route path="/orders" component={Home} />
              <Route path="/about" component={mymenu} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}
export default Mylayout

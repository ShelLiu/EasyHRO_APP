/**
 * Development server
 */


'use strict';

var path = require('path'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  multer = require('multer')(),
  app = express(),
  PORT = 9090;


// Settings
// ---------------------------

app.disable('x-powered-by');
app.set('port', process.env.PORT || PORT);
app.use(cookieParser());
app.use(express.static(__dirname + '/build'));


// Middleware
// ---------------------------

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// REST API
// ---------------------------

app.use(function (req, res, next) {
  console.log('cookie: ' + JSON.stringify(req.cookies) + ' from ' + req.url);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// GET
app.get('/:path?/:any?/:thing?', function (req, res) {
  var path = req.params.path;

  if (!path) {
    return res.sendFile(__dirname + '/build/index.html');
  } else if (req.url === '/custom/config/HITACHIHK-1000_LV_STATE.json') {
    return res.sendFile(__dirname + '/form-validation/demo.json');
  }

  setTimeout(function () {
    switch (path) {
    case 'user-confirm':
      return res.json({
        res: true
      });
    case 'user-menu':
      //return res.sendStatus(999);
      return res.json({
        res: true,
        val: {
          menu: {
            ess: [
              {
                name: 'baseMessage',
                text: '基本信息',
                content: '查看个人信息',
                id: 1984
              },
              {
                name: 'myPay',
                text: '我的工资',
                content: '查看个人薪资',
                id: 2006
              },
              {
                name: 'myVacation',
                text: '我的休假',
                content: '查看个人休假',
                id: 569
              },
              {
                name: 'myOvertime',
                text: '我的加班',
                content: '查看个人加班',
                id: 1456
              },
              {
                name: 'CDPLife',
                text: '我的福利',
                content: '进入 CDPLife',
                url: 'http://www.google.com',
                id: 1457
              }
            ],
            mss: [
              {
                name: 'teamMessage',
                text: '团队信息',
                content: '查看团队信息',
                id: 1
              },
              {
                name: 'leaveManagement',
                text: '请假管理',
                id: '1656',
                content: '查看团队请假',
                notification: 1
              },
              {
                name: 'overtimeManagement',
                text: '加班管理',
                content: '查看团队加班',
                id: '1666',
                notification: 1
              }
            ]
          },
          "picInfo": {
            "name": "René Ash Wagner",
            "empWorkId": "18820",
            "position": "Vice-President of Administration and Finance",
            "url": "../export/upload/hitachihk_emp_info_2608.jpg"
          }
        }
      });
    case 'user-message':
      return res.json({
        res: true,
        val: {
          //basicInfo: {
          //  id: 1,
          //  name: '张阿十',
          //  avatar: 'a2e0012df0916596196342a0915d6c5f.png',
          //  position: '前端设计师'
          //},
          infoList: [
            {
              title: '基本信息',
              items: [[
                {
                  name: '姓名',
                  value: '张阿十'
                },
                {
                  name: '性别',
                  value: '女'
                }
              ], [
                {
                  name: '地址',
                  value: '上海市闵行区莲花路 1733 号 D106（CDP 大楼）'
                },
                {
                  name: '电话',
                  value: '1800000000'
                }
              ]]
            },
            {
              title: '联系信息',
              items: [[
                {
                  name: '地址',
                  value: '上海市闵行区莲花路 1733 号 D106（CDP 大楼）'
                },
                {
                  name: '电话',
                  value: '1800000000'
                }
              ], [
                {
                  name: '地址',
                  value: '上海市闵行区莲花路 1733 号 D106（CDP 大楼）'
                },
                {
                  name: '电话',
                  value: '1800000000'
                }
              ]]
            }
          ]
          //workExp: [
          //  {
          //    items: [
          //      {
          //        name: '时间',
          //        value: '2007–2012'
          //      },
          //      {
          //        name: '地点',
          //        value: 'CDP'
          //      }
          //    ]
          //  },
          //  {
          //    items: [
          //      {
          //        name: '时间',
          //        value: '2012–2007'
          //      },
          //      {
          //        name: '地点',
          //        value: 'PDC'
          //      }
          //    ]
          //  }
          //]
        }
      });
    case 'calendar-salary':
      return res.json({
        "val": {
          "payrollData": {
            "minYear": 2015,
            "payrollPeriodList": [{
              "payResId": 36946,
              "payAccName": "hitachihk201505",
              "payPerYear": 2015,
              "payPerMon": 6
            },
              {
                "payResId": 37674,
                "payAccName": "hitachihk201507",
                "payPerYear": 2015,
                "payPerMon": 8
              },
              {
                "payResId": 35242,
                "payAccName": "hitachihk201508",
                "payPerYear": 2015,
                "payPerMon": 7
              },
              {
                "payResId": 37736,
                "payAccName": "hitachihk201509",
                "payPerYear": 2015,
                "payPerMon": 9
              },
              {
                "payResId": 37530,
                "payAccName": "hitachihk201510",
                "payPerYear": 2015,
                "payPerMon": 9
              }],
            "pointInfo": "本月无数据！"
          },
          "picInfo": {
            "name": "著美玲",
            "empWorkId": "18820",
            "url": "../export/upload/hitachihk_emp_info_2608.jpg"
          }
        },
        "res": true
      });
    case 'user-quota':
      return res.json({
        "val": [
          {
            title: '配额分类 1',
            items: [{
              "name": "员工姓名",
              "value": "罗 美文"
            }, {
              "name": "部门",
              "value": "人事总务法务部"
            }, {
              "name": "年份",
              "value": "2016"
            }, {
              "name": "QuotaType",
              "value": "调休假"
            }, {
              "name": "可取得天数",
              "value": "0.83000"
            }, {
              "name": "已取得天数",
              "value": "0.5"
            }, {
              "name": "剩余天数",
              "value": "0.33"
            }]
          },
          {
            title: '配额分类 2',
            items: [{
              "name": "员工姓名",
              "value": "罗 美文"
            }, {
              "name": "部门",
              "value": "人事总务法务部"
            }, {
              "name": "年份",
              "value": "2016"
            }, {
              "name": "QuotaType",
              "value": "年假"
            }, {
              "name": "可取得天数",
              "value": "0.83000"
            }, {
              "name": "已取得天数",
              "value": "0.5"
            }, {
              "name": "剩余天数",
              "value": "0.33"
            }]
          }
        ],
        "res": true
      });
    case 'ess-lv-config':
    case 'ess-ot-config':
      return res.json({
        val: {
          "JS_CONFIG_FILE": "demo_ess_lv_config.js",
          "formConfig": [{
            "label": "休假类型名称",
            "name": "eleaveSubtype",
            "required": true,
            "options": [{
              "text": "年度带薪休假",
              "value": "M0"
            }, {
              "text": "伤病休假",
              "value": "M1"
            }, {
              "text": "独生子女光荣证",
              "value": "M10"
            }, {
              "text": "产前定期检查",
              "value": "M14"
            }, {
              "text": "多胞胎生育",
              "value": "M15"
            }, {
              "text": "婚假",
              "value": "M2"
            }, {
              "text": "调休",
              "value": "M21"
            }, {
              "text": "晚婚假",
              "value": "M3"
            }, {
              "text": "丧假",
              "value": "M4"
            }, {
              "text": "产假",
              "value": "M5"
            }, {
              "text": "晚育假",
              "value": "M6"
            }, {
              "text": "难产假",
              "value": "M7"
            }],
            "type": "select"
          }, {
            "label": "附件",
            "name": "attachment",
            "type": "file"
          }, {
            "label": "申请日期",
            "name": "applicationDate",
            "type": "date"
          }, {
            "label": "开始时间",
            "name": "eleaveStart",
            "type": "date",
            isLine: false
          }, {
            "label": "时段",
            "name": "ampm",
            "required": true,
            "options": [{
              "text": "上午",
              "value": "am"
            }, {
              "text": "下午",
              "value": "pm"
            }],
            "type": "select",
            isLine: false
          }, {
            "label": "结束时间",
            "name": "eleaveEnd",
            "type": "datetime-local"
          }, {
            "label": "休假理由",
            "name": "eleaveNote",
            "type": "text",
            "disabled": true
          }]
        },
        "res": true
      });
    case 'ess-lv-edit-config':
    case 'ess-ot-edit-config':
      return res.json({
        res: true,
        val: {
          "formConfig": [{
            "name": "type",
            "label": "休假类型名称",
            "type": "select",
            "options": [{
              "text": "年度带薪休假",
              "value": "M0"
            }],
            "required": true,
            "defaultValue": "M0"
          }, {
            "name": "hidden",
            "label": "隐藏",
            "type": "hidden",
            "defaultValue": "123"
          }, {
            "name": "file",
            "label": "附件",
            "type": "file",
            "defaultValue": "abc/003.jpg"
          }],
          "JS_CONFIG_FILE": "custom/validate/demo_ess_lv.js"
        }
      });
    case 'mss-lv-todolist':
    case 'mss-ot-todolist':
      return res.json({
        "val": [{
          "id": 6,
          "End": "2015/09/24 17:30:00",
          "Start": "2015/09/24 09:00:00",
          "hours": "7.5",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 7,
          "End": "2015/10/15 17:30:00",
          "Start": "2015/10/14 09:00:00",
          "hours": "15",
          "Type": "年度带薪休假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }, {
          "id": 9,
          "End": "2015/11/30 17:30:00",
          "Start": "2015/11/27 09:00:00",
          "hours": "15",
          "Type": "晚婚假",
          "department": "新产业开发事业部",
          "state": "审批中",
          "userName": "刘 天"
        }],
        "res": true
      });
    case 'demo_ess_lv_config.js':
      return res.sendFile(__dirname + '/form-validation/leave.js');
    case 'leave-types':
      return res.json({
        res: true,
        val: [
          {
            text: '事假',
            name: 'personalAffairs'
          },
          {
            text: '病假',
            name: 'disease'
          }
        ]
      });
    case 'ess-lv-list':
    case 'ess-ot-list':
    case 'ot-approve-otdetail':
      return res.json({
        res: true,
        val: (function () {
          var base = [{
            "id": 2,
            "End": "2015/09/22",
            "Start": "2015/09/22",
            "hours": "7.5",
            "Type": "婚假",
            "state": "edit",
            stateCode: 0
          }, {
            "id": 7,
            "End": "2015/10/15",
            "Start": "2015/10/14",
            "hours": "15",
            "Type": "年度带薪休假",
            "state": "edit"
          }, {
            "id": 6,
            "End": "2015/09/24",
            "Start": "2015/09/24",
            "hours": "7.5",
            "Type": "年度带薪休假",
            "state": "approved"
          }, {
            "id": 9,
            "End": "2015/11/30",
            "Start": "2015/11/27",
            "hours": "15",
            "Type": "晚婚假",
            "state": "pending"
          }];

          if (req.query.page <= 3) {
            for (var i = 0; i < 4; i += 1) {
              base = base.concat(base);
            }
          }

          return base;
        }())
      });
    case 'ess-lv-detail':
    case 'ess-ot-detail':
      return res.json({
        "val": {
          appInfo: {
            "title": "审批信息",
            "items": [[{
              "firField": "审批人",
              "secField": "海 天"
            }, {
              "firField": "状态",
              "secField": "审批中"
            }], [{
              "firField": "审批人",
              "secField": "李 康"
            }, {
              "firField": "状态",
              "secField": "待审批"
            }]]
          },
          baseInfo: {
            "title": "单据信息",
            "items": [{
              "firField": "员工姓名",
              "secField": "刘 天"
            }, {
              "firField": "审批状态",
              "secField": "审批中"
            }, {
              "firField": "休暇型名",
              "secField": "晚婚假"
            }, {
              "firField": "开始时间",
              "secField": "2015/11/27 09:00:00"
            }, {
              "firField": "结束时间",
              "secField": "2015/11/30 17:30:00"
            }, {
              "firField": "休假小时数",
              "secField": "15"
            }, {
              "firField": "申请日期",
              "secField": "2015/11/09"
            }, {
              "firField": "休假理由",
              "secField": "test"
            }]
          }
        },
        "res": true
      });
    case 'lv-approve-detail':
      return res.json({
        "val": [
          {
            "End": "2015/10/22",
            "Start": "2015/10/22",
            "hours": "7.5",
            "state": "拒绝",
            "leaveType": "年度带薪休假"
          }, {
            "End": "2015/09/21",
            "Start": "2015/09/21",
            "hours": "7.5",
            "state": "拒绝",
            "leaveType": "年度带薪休假"
          }, {
            "End": "2015/09/22",
            "Start": "2015/09/22",
            "hours": "7.5",
            "state": "拒绝",
            "leaveType": "婚假"
          }
        ],
        "res": true
      });
    case 'lv-approve-his':
    case 'ot-approve-his':
    case 'lv-history-member':
    case 'ot-history-member':
      return res.json({
        "val": [{
          "userName": "刘 天",//姓名
          "department": "新产业开发事业部", //部门
          "Type": "年度带薪休假", //休假/加班类型
          "End": "2015/09/24 17:30",//结束时间
          "Start": "2015/09/24 09:00",//开始时间
          "hours": "7.5",//休假/加班小时数
          "state": "拒绝",//审批状态
          "appTime": "2016/04/21 16:18" //审批时间
        }, {
          "userName": "刘 天",//姓名
          "department": "新产业开发事业部", //部门
          "Type": "年度带薪休假", //休假/加班类型
          "End": "2015/09/24 17:30",//结束时间
          "Start": "2015/09/24 09:00",//开始时间
          "hours": "7.5",//休假/加班小时数
          "state": "拒绝",//审批状态
          "appTime": "2016/04/21 16:18" //审批时间
        }, {
          "userName": "刘 天",//姓名
          "department": "新产业开发事业部", //部门
          "Type": "年度带薪休假", //休假/加班类型
          "End": "2015/09/24 17:30",//结束时间
          "Start": "2015/09/24 09:00",//开始时间
          "hours": "7.5",//休假/加班小时数
          "state": "拒绝",//审批状态
          "appTime": "2016/04/21 16:18" //审批时间
        }, {
          "userName": "刘 天",//姓名
          "department": "新产业开发事业部", //部门
          "Type": "年度带薪休假", //休假/加班类型
          "End": "2015/09/24 17:30",//结束时间
          "Start": "2015/09/24 09:00",//开始时间
          "hours": "7.5",//休假/加班小时数
          "state": "拒绝",//审批状态
          "appTime": "2016/04/21 16:18" //审批时间
        }, {
          "userName": "刘 天",//姓名
          "department": "新产业开发事业部", //部门
          "Type": "年度带薪休假", //休假/加班类型
          "End": "2015/09/24 17:30",//结束时间
          "Start": "2015/09/24 09:00",//开始时间
          "hours": "7.5",//休假/加班小时数
          "state": "拒绝",//审批状态
          "appTime": "2016/04/21 16:18" //审批时间
        }, {
          "userName": "刘 天",//姓名
          "department": "新产业开发事业部", //部门
          "Type": "年度带薪休假", //休假/加班类型
          "End": "2015/09/24 17:30",//结束时间
          "Start": "2015/09/24 09:00",//开始时间
          "hours": "7.5",//休假/加班小时数
          "state": "拒绝",//审批状态
          "appTime": "2016/04/21 16:18" //审批时间
        }, {
          "userName": "刘 天",//姓名
          "department": "新产业开发事业部", //部门
          "Type": "年度带薪休假", //休假/加班类型
          "End": "2015/09/24 17:30",//结束时间
          "Start": "2015/09/24 09:00",//开始时间
          "hours": "7.5",//休假/加班小时数
          "state": "拒绝",//审批状态
          "appTime": "2016/04/21 16:18" //审批时间
        }],
        "res": false
      });
    case 'lv-summary-member':
    case 'ot-summary-member':
    case 'team-info-page':
      return res.json({
        res: true,
        val: null
      });
    case 'filter-config-form':
      return res.json({
        "val": {
          "formConfig": [{
            "name": "type",
            "label": "加班类型名称",
            "required": true,
            "type": "select",
            "options": [{"text": "平日加班", "value": "MOT1"}, {"text": "周末加班", "value": "MOT2"}, {
              "text": "节假日加班",
              "value": "MOT3"
            }]
          }, {
            "name": "appState",
            "label": "状态",
            "required": true,
            "type": "select",
            "options": [{"text": "编辑中", "value": 0}, {"text": "审批中", "value": 1}, {
              "text": "已批准",
              "value": 2
            }, {"text": "不批准", "value": 3}]
          }, {
            "name": "timeFiler",
            "label": "时间筛选类型",
            "type": "select",
            "options": [{"text": "申请时间", "value": "applicationDate"}, {
              "text": "开始时间",
              "value": "eovertimeStart"
            }, {"text": "结束时间", "value": "eovertimeEnd"}]
          }, {"name": "startDate", "label": "筛选开始时间", "type": "datetime-local"},
            {
              "name": "endDate",
              "label": "筛选结束时间",
              "type": "datetime-local"
            }]
        }, "res": true
      });
    default:
      res.json({
        res: true
      });
    }
  }, 1000);
});

// POST
app.post('/:path?/:id?', multer.single('attach'), function (req, res) {
  console.log('post: ', req.body, req.file);

  setTimeout(function () {

    switch (req.params.path) {
    case 'login':
      return res.json({
        res: true,
        val: {
          lang: [{
            "langCode": "pla_lan_001",
            "langName": "简体中文",
            "flag": true
          }, {
            "langCode": "pla_lan_002",
            "langName": "English",
            "flag": false
          }],
          "userInfo": {
            "companyCode": "hitachihk-1000",
            "userName": "reese",
            "passWord": null,
            "valid": "true",
            "userTime": 30,
            "userFlag": 1,  // 0 为初次登录
            "userInitFlag": 1,  // 0 为需要修改密码
            "userMail": "mtse@hitachi.cn",
            "phone": "14785296321",
            "lang": "pla_lan_001",
            "sysSip": null,
            "eeId": null,
            "useMss": 1719,
            "useEss": 1718,
            "userEmpId": 2608,
            "userId": 2066,
            "portalUser": false,
            "objectCode": null
          }
        }
        //res: false,
        //error: '公司代码不存在',
        //val: {
        //  company: 'CDP'
        //}
      });
    case 'change-lang':
      return setTimeout(() => {
        res.json({
          res: true,
          val: 'pla_lan_002'
        });
      }, 100);
    case 'user-message-info-type':
      return res.json({
        "val": {
          baseType: [{
            "cmdId": 12000,
            "langCode": "portal_tab_baseinfo",
            "efnType": "p_grp_ess",
            "pla_lan": "Basic Information"
          },
            {
              "cmdId": 12005,
              "langCode": "portal_tab_social_relations",
              "efnType": "p_grp_ess",
              "pla_lan": "社会关系"
            },
            {
              "cmdId": 12001,
              "langCode": "portal_tab_contract_information",
              "efnType": "p_grp_ess",
              "pla_lan": "合同信息"
            },
            {
              "cmdId": 12007,
              "langCode": "portal_tab_ id_ information",
              "efnType": "p_grp_ess",
              "pla_lan": "证件信息"
            },
            {
              "cmdId": 12008,
              "langCode": "portal_tab_ expat_residency_rermit",
              "efnType": "p_grp_ess",
              "pla_lan": "外籍员工居留许可信息"
            }],
          picInfo: {
            "name": "著美玲",
            "empWorkId": "18820",
            "url": "../export/upload/hitachihk_emp_info_2608.jpg",
            position: '前端'
          }
        },
        "res": "true"
      });
    case 'user-base-message-info':
      return setTimeout(function () {
        res.json({
          "val": {
            "items": [[{
              "name": "Join Date",
              "value": "1988-06-01"
            },
              {
                "name": "E-mailE-mailE-mailE-mailE-mailE-mailE-mailE-mailE-mail",
                "value": "mtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cmtse@hitachi.cn"
              },
              {
                "name": "Account Code",
                "value": "0040315725267"
              },
              {
                "name": "Bank",
                "value": "004"
              },
              {
                "name": "Cost Center",
                "value": "HK-IFG-GM2-HK"
              },
              {
                "name": "Owner's Name",
                "value": "TSE, Mei Ling, May"
              },
              {
                "name": "Legal Company",
                "value": "HCH"
              },
              {
                "name": "Branch",
                "value": "HK"
              },
              {
                "name": "Department",
                "value": "IFG"
              },
              {
                "name": "Position",
                "value": "Manager"
              },
              {
                "name": "Personal ID",
                "value": "C254404(9)"
              },
              {
                "name": "Residential Address",
                "value": "Flat 3702, Shing Yam House, On Yan Estate, Kwai Chung, New Territories"
              },
              {
                "name": "Service Year",
                "value": "27.46"
              },
              {
                "name": "Employee ID",
                "value": "18820"
              },
              {
                "name": "English Name",
                "value": "TSE, Mei Ling, May"
              },
              {
                "name": "Chinese Name",
                "value": "美玲"
              },
              {
                "name": "Nationality",
                "value": "China"
              },
              {
                "name": "Age",
                "value": "53"
              }]]
          },
          "res": "true"
        });
      }, 2000);
    case 'salary':
      return res.json({
        "val": {
          "infoList": [
            {
              "title": "eps_basic_info",
              "items": [{
                "name": "Employee ID",
                "value": "18820"
              }, {
                "name": "Chinese Name",
                "value": "�x美玲"
              },
                {
                  "name": "English Name",
                  "value": "TSE, Mei Ling, May"
                }, {
                  "name": "Company Name",
                  "value": "Hitachi East Asia Ltd."
                },
                {
                  "name": "Department",
                  "value": "IFG"
                }, {
                  "name": "Position",
                  "value": "Manager"
                }, {
                  "name": "Join Date",
                  "value": "1988-06-01"
                },
                {
                  "name": "Pay Month",
                  "value": "201510"
                }]
            }, {
              "title": "eps_earning_deduction",
              "items": [{
                "name": "Gross Earnings",
                "value": "32970.00"
              },
                {
                  "name": "Gross Deductions",
                  "value": "1648.50"
                }]
            }, {
              "title": "eps_net_pay",
              "items": [{
                "name": "Net Pay",
                "value": "31321.50"
              }]
            },
            {
              "title": "eps_mpf_orso",
              "items": [{
                "name": "Issue Date",
                "value": "2015-10-31"
              }, {
                "name": "Relevant Income",
                "value": "32970.00"
              },
                {
                  "name": "ORSO(Company)",
                  "value": "2307.90"
                }, {
                  "name": "ORSO(Employee)",
                  "value": "1648.50"
                }, {
                  "name": "Mandatory(Company)",
                  "value": "0.00"
                },
                {
                  "name": "Mandatory(Employee)",
                  "value": "0.00"
                }, {
                  "name": "Voluntary(Company)",
                  "value": "0.00"
                }]
            },
            {
              "title": "eps_attendance",
              "items": [{
                "name": "Overtime Hours",
                "value": "0.00"
              }, {
                "name": "Early/Late/Personal Affaire Minutes",
                "value": "0.00"
              },
                {
                  "name": "No Pay Leave Days",
                  "value": "0.00"
                }, {
                  "name": "4/5 Pay Sick Leave Days",
                  "value": "0.00"
                }, {
                  "name": "Maternity Leave Days",
                  "value": "0.00"
                },
                {
                  "name": "Paternity Leave Days",
                  "value": "0.00"
                }]
            }, {
              "title": "eps_earnings",
              "items": [{
                "name": "Basic Salary",
                "value": "32970.00"
              },
                {
                  "name": "Living Allowance",
                  "value": "0.00"
                }, {
                  "name": "Housing Allowance",
                  "value": "0.00"
                }, {
                  "name": "Transportation Allowance",
                  "value": "0.00"
                },
                {
                  "name": "Language Allowance",
                  "value": "0.00"
                }, {
                  "name": "Child Education Allowance",
                  "value": "0.00"
                }, {
                  "name": "Home Return Allowance",
                  "value": "0.00"
                },
                {
                  "name": "Overtime Fee",
                  "value": "0.00"
                }, {
                  "name": "Severance Payment",
                  "value": "0.00"
                }, {
                  "name": "Long Service Payment",
                  "value": "0.00"
                },
                {
                  "name": "Payment in lieu of Notice",
                  "value": "0.00"
                }, {
                  "name": "Shortage Adjustment",
                  "value": "0.00"
                }, {
                  "name": "Bonus",
                  "value": "0.00"
                },
                {
                  "name": "Double Pay",
                  "value": "0.00"
                }, {
                  "name": "Special Bonus",
                  "value": "0.00"
                }]
            },
            {
              "title": "eps_deductions",
              "items": [{
                "name": "No Pay Absence Deduction",
                "value": "0.00"
              }, {
                "name": "No Pay Leave Deduction",
                "value": "0.00"
              },
                {
                  "name": "Sick Leave Deduction",
                  "value": "0.00"
                }, {
                  "name": "Maternity Leave Deduction",
                  "value": "0.00"
                }, {
                  "name": "Paternity Leave Deduction",
                  "value": "0.00"
                },
                {
                  "name": "ORSO/MPF Deduction",
                  "value": "1648.50"
                }, {
                  "name": "Loan Repay",
                  "value": "0.00"
                }, {
                  "name": "Deduction in Lieu of Notice",
                  "value": "0.00"
                }]
            }],
          //"payCharts": ""
          "payCharts": [{
            "payrollChartsName": "NetMonthly Income",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }, {
            "payrollChartsName": "NetMonthly Outcome",
            "payrollTotal": 11287.9
          }]
        },
        "res": true
      });
    case 'team-info-page':
      return res.json({
        res: true,
        val: (function () {
          var base = [
            {
              id: 1,
              firField: '张阿十',
              avatar: 'a2e0012df0916596196342a0915d6c5f.png',
              secField: '前端设计师前端设计师前端设计师前端设计师前端设计师'
            },
            {
              id: 2,
              firField: '张阿廿',
              avatar: 'a2e0012df0916596196342a0915d6c5f.png',
              secField: '前端服务员'
            }
          ];

          if (req.body.page <= 3) {
            for (var i = 0; i < 4; i += 1) {
              base = base.concat(base);
            }
          }

          return base.slice(0, 20);
        }())
      });
    case 'quota-team-member':
      return res.json({
        "val": [{
          "secField": "生活产业事业部",
          "id": 12000014,
          "firField": "曾 晖"
        }, {
          "secField": "财务会计审查部",
          "id": 12000015,
          "firField": "谢 颖"
        }, {
          "secField": "泛用·聚氨酯涂料化学品部",
          "id": 12000017,
          "firField": "林 光晓"
        }, {
          "secField": "聚氯乙烯树脂部",
          "id": 12000019,
          "firField": "杨 思慧"
        }, {
          "secField": "人事总务法务部",
          "id": 12000020,
          "firField": "张 月华"
        }, {
          "secField": "泛用·聚氨酯涂料化学品部",
          "id": 12000021,
          "firField": "吴 军"
        }, {
          "secField": "生活产业事业部",
          "id": 12000022,
          "firField": "李 晓琼"
        }, {
          "secField": "聚氯乙烯树脂部",
          "id": 12000024,
          "firField": "刘 湘"
        }, {
          "secField": "财务会计审查部",
          "id": 12000025,
          "firField": "麦 智莹"
        }, {
          "secField": "能源部",
          "id": 12000028,
          "firField": "邵 远志"
        }],
        "res": false
      });
    case 'ess-lv-summary':
    case 'ess-ot-summary':
      return res.json({
        "val": [{
          "title": "婚假",
          "items": [{
            "firField": "审批中",
            "secField": "7.5"
          }]
        }, {
          "title": "年度带薪休假",
          "items": [{
            "firField": "编辑中",
            "secField": "7.5"
          }, {
            "firField": "审批中",
            "secField": "22.5"
          }, {
            "firField": "已批准",
            "secField": "15"
          }]
        }, {
          "title": "晚婚假",
          "items": [{
            "firField": "审批中",
            "secField": "15"
          }]
        }],
        "res": true
      });
    case 'ess-submit-lv':
    case 'ess-insert-lv':
      return res.json({
        res: true,
        confirm: 'Confirm'
      });
    case 'lv-team-summary':
    case 'ot-team-summary':
      return res.json({
        "val": [{
          "summaryInfo": {
            "title": "审批信息",
            "items": [{
              "title": "年度带薪休假",
              "items": [{"firField": "编辑中", "secField": "3.75"}, {
                "firField": "审批中",
                "secField": "18.75"
              }, {"firField": "已批准", "secField": "48.75"}, {"firField": "不批准", "secField": "7.5"}]
            }, {"title": "婚假", "items": [{"firField": "审批中", "secField": "67.5"}]}, {
              "title": "晚婚假",
              "items": [{"firField": "审批中", "secField": "60"}]
            }, {"title": "丧假", "items": [{"firField": "审批中", "secField": "7.5"}]}, {
              "title": "产假",
              "items": [{"firField": "不批准", "secField": "3.75"}]
            }]
          }, "userInfo": {"title": "员工信息", "items": [{"firField": "刘 天", "secField": "新产业开发事业部"}]}
        }, {
          "summaryInfo": {
            "title": "审批信息",
            "items": [{"title": "年度带薪休假", "items": [{"firField": "编辑中", "secField": "3.75"}]}, {
              "title": "产前定期检查",
              "items": [{"firField": "审批中", "secField": "3.75"}]
            }]
          }, "userInfo": {"title": "员工信息", "items": [{"firField": "海 天", "secField": "新产业开发事业部"}]}
        }], "res": true
      });
    }

    res.json({
      res: true
    });
  }, 1000);
});

// PUT
app.put('/:path?', function (req, res) {
  console.log('put: ', req.body);

  res.json({
    res: true
  });
});

// DELETE
app.delete('/:path?', function (req, res) {
  console.log('delete: ', req.body);

  res.json({
    res: true
  });
});


// Listening
// ---------------------------

app.listen(app.get('port'), function () {
  console.log('Listening at port: ' + app.get('port'));
});

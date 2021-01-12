jsondata='';



var data1 = {
    "title": "newFlow_1",
    "nodes": {
        "demo_node_1": {
            "name": "注册账号",
            "left": 504,
            "top": 53,
            "type": "start round",
            "width": 24,
            "height": 24,
            "alt": true
        },
        "demo_node_2": {
            "name": "老用户",
            "left": 231,
            "top": 141,
            "type": "node",
            "width": 100,
            "height": 25,
            "alt": true
        },
        "demo_node_3": {
            "name": "新用户",
            "left": 602,
            "top": 155,
            "type": "node",
            "width": 100,
            "height": 25,
            "alt": true
        },
        "demo_node_4": {
            "name": "忘记密码",
            "left": 90,
            "top": 256,
            "type": "node",
            "width": 100,
            "height": 25,
            "alt": true
        },
        "demo_node_5": {
            "name": "重置密码",
            "left": 339,
            "top": 254,
            "type": "node",
            "width": 100,
            "height": 25,
            "alt": true
        },
        "demo_node_6": {
            "name": "注册新账户",
            "left": 665,
            "top": 252,
            "type": "node",
            "width": 100,
            "height": 25,
            "alt": true
        }
    },
    "lines": {
        "demo_line_7": {
            "type": "sl",
            "from": "demo_node_1",
            "to": "demo_node_2",
            "name": "",
            "alt": true
        },
        "demo_line_8": {
            "type": "sl",
            "from": "demo_node_1",
            "to": "demo_node_3",
            "name": "",
            "alt": true
        },
        "demo_line_9": {
            "type": "sl",
            "from": "demo_node_2",
            "to": "demo_node_4",
            "name": "",
            "alt": true
        },
        "demo_line_10": {
            "type": "sl",
            "from": "demo_node_2",
            "to": "demo_node_5",
            "name": "",
            "alt": true
        },
        "demo_line_11": {
            "type": "sl",
            "from": "demo_node_3",
            "to": "demo_node_6",
            "name": "",
            "alt": true
        }
    },
    "areas": {},
    "initNum": 12
}
/* eslint-disable */
const TP_DATA = {
  'edges': [
    {
      'source': 'bookinfo/a/v1',
      'target': 'bookinfo/c/v1',
      'traffics': [
        {
          'type': 'requests',
          'protocol': 'http',
          'direction': 'in',
          'rate': 10
        },
        {
          'type': 'errors',
          'protocol': 'http',
          'direction': 'in',
          'rate': 2
        },
        {
          'type': 'avg_latency',
          'protocol': 'http',
          'direction': 'in',
          'rate': 20
        }
      ]
    },
    {
      'source': 'bookinfo/a/v1',
      'target': 'bookinfo/c/v2',
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 4
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 10
        }
      ]
    },
    {
      "source": 'bookinfo/a/v1',
      "target": "bookinfo/d/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 5
        },
        {
           "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 10
        }
      ]
    },
    {
      "source": 'bookinfo/a/v1',
      "target": "bookinfo/e/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 5
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 2
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 10
        }
      ]
    },
    {
      "source": "bookinfo/b/v1",
      "target": "bookinfo/c/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 0
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        }
      ]
    },
    {
      "source": "bookinfo/b/v1",
      "target": "bookinfo/c/v2",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 1
        }
      ]
    },
    {
      "source": "bookinfo/b/v2",
      "target": "bookinfo/c/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 0
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 0
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 0
        }
      ]
    },
    {
      "source": "bookinfo/b/v2",
      "target": "bookinfo/c/v2",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 2
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        }
      ]
    },
    {
      "source": "bookinfo/b/v2",
      "target": "bookinfo/d/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 2
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 0
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 2
        }
      ]
    },

    {
      "source": "bookinfo/b/v2",
      "target": "bookinfo/e/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 2
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        }
      ]
    },
    {
      "source": "bookinfo/c/v1",
      "target": "bookinfo/e/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 0
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 2
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        }
      ]
    },
    {
      "source": "bookinfo/c/v2",
      "target": "bookinfo/e/v1",
      "traffics": [
        {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 2
        },
        {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 1
        },
        {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 0
        }
      ]
    },
    {
      "source": "bookinfo/c/v2",
      "target": "bookinfo/d/v1",
      "traffics": [
          {
            "type": "requests",
            "protocol": "http",
            "direction": "in",
            "rate": 10
          },
          {
            "type": "errors",
            "protocol": "http",
            "direction": "in",
            "rate": 4
          },
          {
            "type": "avg_latency",
            "protocol": "http",
            "direction": "in",
            "rate": 20
          }
      ]
    },
    {
      "source": "bookinfo/c/v2",
      "target": "bookinfo/d/v2",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 8
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 5
        }
      ]
    },
    {
      "source": "bookinfo/c/v1",
      "target": "bookinfo/f/v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 5
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 6
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 7
        }
      ]
    },
    {
      "source": "bookinfo/c/v1",
      "target": "bookinfo/f/v2",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 4
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 5
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 5
        }
      ]
    },
    {
      "source": "bookinfo/c/v2",
      "target": "bookinfo/f/v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 3
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 5
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 3
        }
      ]
    },
    {
      "source": "bookinfo/c/v2",
      "target": "bookinfo/f/v2",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 6
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 9
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 5
        }
      ]
    }
  ],
  // 合并子节点：源id=》id=namespace + name，version= '',children:[子节点]
  // 单节点：数据不变
  'nodes': [
    {
      'id': 'bookinfo/a/v1',
      'type': "",
      "namespace": "bookinfo",
      "name": "a",
      "app": "bookinfo",
      "version": "v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 10
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 20
        }
      ]
    },
    {
      "id": "bookinfo/b/v1",
      "type": "",
      "namespace": "bookinfo",
      "name": "b",
      "app": "bookinfo",
      "version": "v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 10
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 20
        }
      ]
    },
    {
      "id": "bookinfo/b/v2",
      "type": "",
      "namespace": "bookinfo",
      "name": "b",
      "app": "bookinfo",
      "version": "v2",
      "traffics": [
          {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 8
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 1
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 15
        }
      ]
    },
    {
      "id": "bookinfo/c/v1",
      "type": "",
      "namespace": "bookinfo",
      "name": "c",
      "app": "bookinfo",
      "version": "v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 15
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 3
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 15
        }
      ]
    },
    {
      "id": "bookinfo/c/v2",
      "type": "",
      "namespace": "bookinfo",
      "name": "c",
      "app": "bookinfo",
      "version": "v2",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 12
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 1
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 10
        }
      ]
    },
    {
      "id": "bookinfo/d/v1",
      "type": "",
      "namespace": "bookinfo",
      "name": "d",
      "app": "bookinfo",
      "version": "v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 0
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 0
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 0
        }
      ]
    },
    {
      "id": "bookinfo/d/v2",
      "type": "",
      "namespace": "bookinfo",
      "name": "d",
      "app": "bookinfo",
      "version": "v2",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 1
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 3
        }
      ]
    },
    {
      "id": "bookinfo/e/v1",
      "type": "",
      "namespace": "bookinfo",
      "name": "e",
      "app": "bookinfo",
      "version": "v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 1
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 3
        }
      ]
    },
    {
      "id": "bookinfo/f/v1",
      "type": "",
      "namespace": "bookinfo",
      "name": "f",
      "app": "bookinfo",
      "version": "v1",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 3
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 3
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 4
        }
      ]
    },
    {
      "id": "bookinfo/f/v2",
      "type": "",
      "namespace": "bookinfo",
      "name": "f",
      "app": "bookinfo",
      "version": "v2",
      "traffics": [
        {
          "type": "requests",
          "protocol": "http",
          "direction": "in",
          "rate": 5
        },
        {
          "type": "errors",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        },
        {
          "type": "avg_latency",
          "protocol": "http",
          "direction": "in",
          "rate": 2
        }
      ]
    },
  ]
}

export {
  TP_DATA
}

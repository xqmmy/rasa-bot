
## 启动步骤

没有cpu

#### 第一步

bert-serving-start  -pooling_layer -4 -3 -2 -1   -model_dir=C:\chinese_L-12_H-768_A-12    -num_worker=1    -max_seq_len=16 -cpu

#### 第二步
rasa run --enable-api

#### 第三步：

rasa run actions

server启动完成



注：chatH5.html是一个简单的聊天界面，方便测试使用，项目中涉及的生产数据均被删除，数据可能需要自己准备。




bert-serving-start \
    -pooling_layer -4 -3 -2 -1 \
    -model_dir="http://localhost:5055/webhook \
    -num_worker=8 \
    -max_seq_len=16


bert-serving-start  -pooling_layer -4 -3 -2 -1   -model_dir=C:\chinese_L-12_H-768_A-12    -num_worker=1    -max_seq_len=16
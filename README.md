# Log Collector

A simple log collector app listening UDP 5514

## Reference

https://nodejs.org/api/dgram.html#dgram_socket_bind_options_callback

## Test

Run the command in shell.

```echo -n '{"date":"2020-07-15", "time":"20:59:40", logid":"0000000013", "type":"traffic", "subtype":"forward", "level":"notice", "vd":"root", "eventtime":"1594871980266791507", "tz":"-0700", "srcip":"10.1.1.140", "srcport":"47269", "srcintf":"lan", "srcintfrole":"lan", "dstip":"112.124.0.188", "dstport":"15000", "dstintf":"wan1", "dstintfrole":"wan", "srccountry":"Reserved", "dstcountry":"China", "sessionid":"2038461", "proto":6", "action":"deny", "policyid":"0", "policytype":"policy", "service":"tcp/15000", "trandisp":"noop", "duration":"0", "sentbyte":"0", "rcvdbyte":"0", "sentpkt":"0", "appcat":"unscanned", "crscore":"30", "craction":"131072", "crlevel":"high" }' | nc -w0 -u 127.0.0.1 514

```

var one = '*';
var two = '*';
var path = '';
var arrayItem = [
{"id":"00","title":"起亚 KIA-K3S-李敏镐","link":"https://www.apaipian.com/play/2319_3164.html","url":"group1/M01/01/17/CgpmTlt7fIGAcrJWAAIZcHCtSi4869.jpg"},
{"id":"00","title":"雪佛兰 Chevrolet -迈锐宝XL","link":"https://www.apaipian.com/play/2319_7713.html","url":"group1/M01/01/17/CgpmTlt08mSANScRAAJDvNGxToc793.jpg"},
{"id":"00","title":"广汽传祺-传祺在握 传奇在我","link":"https://www.apaipian.com/play/2319_12467.html","url":"group1/M01/00/DE/CgptuFt9BiiAfvbDAAJXeKi_OJ4872.jpg"},
{"id":"00","title":"本田 Honda-开了他的脑盖 看见他的世界","link":"https://www.apaipian.com/play/2319_12897.html","url":"group1/M01/00/DD/CgpsbFt9LimAaGhpAAH2U9L7FFs920.jpg"},
{"id":"00","title":"凯迪拉克 Cadillac - SLS赛威","link":"https://www.apaipian.com/play/2319_12939.html","url":"group1/M01/01/17/CgpmTlt9B-aAPug8AAF1LSdmVLA642.jpg"},
{"id":"00","title":"吉利 Geely-新博瑞-大美中国车篇","link":"https://www.apaipian.com/play/2319_20870.html","url":"group1/M01/00/DC/CgpsbFt6iCCAMkwuAAF1af7NDmU994.jpg"},
{"id":"00","title":"雪铁龙 Citroen-DS前卫巴黎-王凯篇","link":"https://www.apaipian.com/play/2319_21083.html","url":"group1/M01/01/16/Cgpw7Ft7h0aAaKaRAAGS7ABsT0I515.jpg"},
{"id":"00","title":"Smart-红蓝特别版","link":"https://www.apaipian.com/play/2319_21936.html","url":"group1/M01/01/17/CgpmTlt7iQCAO3p9AAFSS-OJThA177.jpg"},
{"id":"00","title":"吉利 Geely-让幸福更进一步","link":"https://www.apaipian.com/play/2319_22283.html","url":"group1/M01/00/DE/CgptuFt7iWyAdMGUAAJJUoMDdKg154.jpg"},
{"id":"00","title":"雷克萨斯 LEXUS - LS350 打鼓篇","link":"https://www.apaipian.com/play/2319_22714.html","url":"group1/M01/01/16/Cgpw7Ft9EbOAV273AAGIo42e66c550.jpg"},
{"id":"00","title":"本田 Honda - Crider","link":"https://www.apaipian.com/play/2319_23262.html","url":"group1/M01/01/17/CgpmTlt9FQeAXok2AAGeCeHzy68885.jpg"},
{"id":"00","title":"奥迪  Audi-A4 Quattro-冰雪 我主场","link":"https://www.apaipian.com/play/2319_24625.html","url":"group1/M01/00/DC/CgpsbFt7ixKAJssGAAG780iRI8U937.jpg"},
{"id":"00","title":"东南-V6菱仕","link":"https://www.apaipian.com/play/2319_26181.html","url":"group1/M01/01/16/Cgpw7Ft9IDmALMsrAAGE5T9inv4629.jpg"},
{"id":"00","title":"吉利 Geely-博瑞-冠军入阵曲","link":"https://www.apaipian.com/play/2319_26230.html","url":"group1/M01/00/DE/CgptuFt7i9GAMLF0AAE7w_rdkDs859.jpg"},
{"id":"00","title":"吉利 Geely-博瑞-游泳队","link":"https://www.apaipian.com/play/2319_26233.html","url":"group1/M01/01/16/Cgpw7Ft7jEeAZFZyAAKpPk2CsNU373.jpg"},
{"id":"00","title":"雪铁龙 Citroen-C5-创享生活","link":"https://www.apaipian.com/play/2319_26952.html","url":"group1/M01/00/DC/CgpsbFt7kC6AfHTuAAILrsSFZUs817.jpg"},
{"id":"00","title":"别克Buick-君威-小提琴篇","link":"https://www.apaipian.com/play/2319_27724.html","url":"group1/M00/00/BC/CgpsbFq0iYWAdJngAAI7lIFXePs735.jpg"},
{"id":"00","title":"大众 Volkswagen-宝来-婚礼篇","link":"https://www.apaipian.com/play/2319_28480.html","url":"group1/M00/00/C1/CgpsbFrDO6qACK-oAAP3AA9wRQg621.jpg"},
{"id":"00","title":"马自达 MAZDA-加速度矢量控制技术 ","link":"https://www.apaipian.com/play/2319_29999.html","url":"group1/M01/01/0E/CgpmTlsGhJiAErlOAAE4KCmz7a4734.jpg"},
{"id":"00","title":"宝马 BMW-7 Series","link":"https://www.apaipian.com/play/2319_31664.html","url":"group1/M01/00/E0/CgptuFuGCGSAP6NqAAFh8ccujAs571.jpg"},
{"id":"01","title":"丰田 Toyota-爱一直都在","link":"https://www.apaipian.com/play/2319_4303.html","url":"group1/M01/01/17/CgpmTlt7uBiAd5aZAAJPduAna7E577.jpg"},
{"id":"01","title":"丰田 Toyota-初恋篇","link":"https://www.apaipian.com/play/2319_4305.html","url":"group1/M01/01/17/CgpmTlt7uKKAOIc0AAEquFaNcvY158.jpg"},
{"id":"01","title":"丰田 Toyota-失恋篇","link":"https://www.apaipian.com/play/2319_4306.html","url":"group1/M01/01/16/Cgpw7Ft7uPCAZMqIAAG5ZYBiC8U833.jpg"},
{"id":"01","title":"丰田 Toyota-一见钟情篇","link":"https://www.apaipian.com/play/2319_4307.html","url":"group1/M01/01/16/Cgpw7Ft7uXKAJOfsAAGcMwUDbyM183.jpg"},
{"id":"01","title":"丰田 Toyota-妈妈的战车","link":"https://www.apaipian.com/play/2319_4308.html","url":"group1/M00/00/07/CgptuFhmDBuAECWGAALdARYQdVo825.jpg"},
{"id":"01","title":"福特 Ford-密码篇","link":"https://www.apaipian.com/play/2319_4389.html","url":"group1/M01/01/17/CgpmTlt7uxSAZVVOAAHWNKcsuB0377.jpg"},
{"id":"01","title":"奔驰 Mercedes Benz - 圣诞篇","link":"https://www.apaipian.com/play/2319_4720.html","url":"group1/M01/01/16/Cgpw7Ft7vEOAXSuqAAG7TWoU6nk394.jpg"},
{"id":"01","title":"斯巴鲁 Subaru-非诚勿扰篇","link":"https://www.apaipian.com/play/2319_6496.html","url":"group1/M01/01/17/CgpmTlt7wGqAfEI9AAGrayJtM_c048.jpg"},
{"id":"01","title":"雪佛兰 Chevrolet-爱上想不到","link":"https://www.apaipian.com/play/2319_7943.html","url":"group1/M01/00/DE/CgptuFt7wRSAQ2kUAAHwQa7Ox6M766.jpg"},
{"id":"01","title":"大众 Volkswagen-同行25年","link":"https://www.apaipian.com/play/2319_8500.html","url":"group1/M01/00/DC/CgpsbFt7yXWAJns4AALr9PwKNoY553.jpg"},
{"id":"01","title":"福特 Ford-父亲的修理铺","link":"https://www.apaipian.com/play/2319_12423.html","url":"group1/M01/00/DE/CgptuFt71P6AM6VWAAMl2PIzg90022.jpg"},
{"id":"01","title":"福特 Ford-空地儿","link":"https://www.apaipian.com/play/2319_12431.html","url":"group1/M01/00/DE/CgptuFt71UOAPP0hAAKoWT_9BL8514.jpg"},
{"id":"01","title":"东风标致 Peugot-选择爱","link":"https://www.apaipian.com/play/2319_14615.html","url":"group1/M01/01/16/Cgpw7Ft73EKAZXIvAAGGr_nzdjE277.jpg"},
{"id":"01","title":"别克 Buick-十二星座之狮子座-坐标","link":"https://www.apaipian.com/play/2319_18347.html","url":"group1/M01/01/19/Cgpw7FuNCtmAB51XAAFjo3mbJ2E475.jpg"},
{"id":"01","title":"别克 Buick-新君越五部曲之Hello","link":"https://www.apaipian.com/play/2319_22101.html","url":"group1/M01/01/17/CgpmTlt743qAYX43AAGnej9ygUM068.jpg"},
{"id":"01","title":"别克 Buick-新君越五部曲之危机","link":"https://www.apaipian.com/play/2319_22113.html","url":"group1/M01/00/DE/CgptuFt745yARj4DAAG0FH08bEA367.jpg"},
{"id":"01","title":"别克 Buick-新君越五部曲之失眠","link":"https://www.apaipian.com/play/2319_22140.html","url":"group1/M01/00/DC/CgpsbFt747KAXRVQAAJZswP2tuw226.jpg"},
{"id":"01","title":"别克 Buick-新君越五部曲之棋中棋","link":"https://www.apaipian.com/play/2319_22153.html","url":"group1/M00/01/16/Cgpw7Ft748SAT22fAAHQ_MTpaLo509.jpg"},
{"id":"01","title":"别克 Buick-新君越五部曲之读心术","link":"https://www.apaipian.com/play/2319_22157.html","url":"group1/M00/01/16/Cgpw7Ft749mAEGGqAAHbMek9XBo416.jpg"},
{"id":"01","title":"荣威 Roewe-i6-我的自私爸爸","link":"https://www.apaipian.com/play/2319_23674.html","url":"group1/M01/00/DC/CgpsbFt75eOAXBerAAH92XAW0fU229.jpg"},
{"id":"02","title":"瑞博恩汽车金融-二手车平台","link":"https://www.apaipian.com/play/1002_20336.html","url":"group1/M00/00/F6/CgpmTlqyNFOAbeiJAAI6DFLJogg259.jpg"},
{"id":"02","title":"荣威 Roewe - i6","link":"https://www.apaipian.com/play/2319_28121.html","url":"group1/M00/00/C0/CgptuFq7OzyAbH6hAAGpLZBan3s500.jpg"},
{"id":"02","title":"CareFinland-维修服务商","link":"https://www.apaipian.com/play/2319_31688.html","url":"group1/M01/00/DF/CgpsbFuGDfqACb9xAAFi9J9sduw894.jpg"},
{"id":"02","title":"Auto Scratch-维修流程篇","link":"https://www.apaipian.com/play/2319_31689.html","url":"group1/M01/00/E0/CgptuFuGDzCAUxyCAAFUvSHYnDk061.jpg"},
{"id":"02","title":"Credit24-Car","link":"https://www.apaipian.com/play/2319_31690.html","url":"group1/M01/00/E0/CgptuFuGD9qAb_97AAE4Grb-IkQ843.jpg"},
{"id":"02","title":"福特 Ford-Eco","link":"https://www.apaipian.com/play/2319_31691.html","url":"group1/M01/01/18/Cgpw7FuGEKuAYDWuAAFL9hLE5lo440.jpg"},
{"id":"02","title":"SEAT-品质篇","link":"https://www.apaipian.com/play/2319_31694.html","url":"group1/M01/00/E0/CgptuFuGFUuAUMy-AAFEhz9cwPI841.jpg"},
{"id":"02","title":"Smart Car-Against Dumb","link":"https://www.apaipian.com/play/2319_31695.html","url":"group1/M01/00/E0/CgptuFuGFnSAXXA8AAHOfipWhbU395.jpg"},
{"id":"03","title":"北汽小E-功能片-消费者篇","link":"https://www.apaipian.com/play/2319_595.html","url":"group1/M01/01/19/Cgpw7FuM92KAOnthAAG8i6jeoyE820.jpg"},
{"id":"03","title":"大众 Volkswagen - Golf 高尔夫","link":"https://www.apaipian.com/play/2319_985.html","url":"group1/M01/01/17/CgpmTltzqrSAd9RvAAIzsc6Q6-s349.jpg"},
{"id":"03","title":"现代 Hyundai - 索纳塔","link":"https://www.apaipian.com/play/2319_3273.html","url":"group1/M01/00/DE/CgptuFtz2bGAZi2vAAJWNE3byss821.jpg"},
{"id":"03","title":"马自达 MAZDA- Launch","link":"https://www.apaipian.com/play/2319_4719.html","url":"group1/M01/01/1B/CgpmTluM_mqAMNiwAAFZy0Grd3o412.jpg"},
{"id":"03","title":"奇瑞 Chery-e3生活篇","link":"https://www.apaipian.com/play/2319_5568.html","url":"group1/M00/00/0C/CgpsbFhqJI2AF_CrAAKIVUYcyss784.jpg"},
{"id":"03","title":"奥迪 Audi - A6","link":"https://www.apaipian.com/play/2319_8876.html","url":"group1/M01/01/15/Cgpw7Ft6KA-AQrr_AAJBoO2DpBk357.jpg"},
{"id":"03","title":"凯迪拉克 Cadillac - CT6","link":"https://www.apaipian.com/play/2319_12805.html","url":"group1/M01/01/19/Cgpw7FuNBiyAIyOBAAIK-NzTer8127.jpg"},
{"id":"03","title":"捷豹 Jaguar - XF & XFR ","link":"https://www.apaipian.com/play/2319_12860.html","url":"group1/M01/01/17/CgpmTlt6XHGAcmFbAAHbzngfyuE433.jpg"},
{"id":"03","title":"荣威 Roewe - 350","link":"https://www.apaipian.com/play/2319_26666.html","url":"group1/M01/00/DC/CgpsbFt6k3eAMPdaAAIiamoASiY095.jpg"},
{"id":"03","title":"东风雪铁龙 Citroen-C6","link":"https://www.apaipian.com/play/2319_26922.html","url":"group1/M01/00/DC/CgpsbFt6lASAYGBUAALQ2AKqDOI997.jpg"},
{"id":"03","title":"宝马 BMW-UK TV版","link":"https://www.apaipian.com/play/2319_31669.html","url":"group1/M01/01/19/CgpmTluGGRiAZxUoAAFA_MP-EZk550.jpg"},
{"id":"03","title":"宝马 BMW-i3-电池篇","link":"https://www.apaipian.com/play/2319_31670.html","url":"group1/M01/01/19/CgpmTluGGeaAerrfAAIK99yTFB0760.jpg"},
{"id":"03","title":"宝马 BMW-M6-Gran","link":"https://www.apaipian.com/play/2319_31672.html","url":"group1/M01/01/18/Cgpw7FuGG3WADH7uAAGMfwhzaoE676.jpg"},
{"id":"03","title":"宝马 BMW-7 Series-细节篇","link":"https://www.apaipian.com/play/2319_31675.html","url":"group1/M01/00/DF/CgpsbFuGJWKAYu4aAAGPo_RTkko462.jpg"},
{"id":"03","title":"宝马 BMW-M4","link":"https://www.apaipian.com/play/2319_31676.html","url":"group1/M01/01/1B/Cgpw7FuZ7OSADZ-mAAGWTTjy4b0374.jpg"},
{"id":"03","title":"奔驰 Mercedes Benz-4MATIC","link":"https://www.apaipian.com/play/2319_31697.html","url":"group1/M01/00/DF/CgpsbFuGP3KAKaTAAAILXXAHwOA292.jpg"},
{"id":"04","title":"大众 Volkswagen - 全家福篇","link":"https://www.apaipian.com/play/2319_3032.html","url":"group1/M01/01/15/Cgpw7Ftz1qKAF05BAAJJs8f46CI513.jpg"},
{"id":"04","title":"现代 Hyundai-Grandeur ","link":"https://www.apaipian.com/play/2319_3275.html","url":"group1/M00/01/17/CgpmTlt83QWALv6IAAIMI1ChzO8169.jpg"},
{"id":"04","title":"大众 Volkswagen-迈腾","link":"https://www.apaipian.com/play/2319_4129.html","url":"group1/M01/00/DE/CgptuFt83tSAbmNjAAII8O0zZVs230.jpg"},
{"id":"04","title":"宝马 BMW-婴儿鞋","link":"https://www.apaipian.com/play/2319_4253.html","url":"group1/M00/01/16/Cgpw7Ft84ReAAjzdAAIHAaA0yfg039.jpg"},
{"id":"04","title":"英菲尼迪 Infiniti - 周迅篇","link":"https://www.apaipian.com/play/2319_8329.html","url":"group1/M01/00/DE/CgptuFt8462AdqfAAAJG4OUyDz8722.jpg"},
{"id":"04","title":"宝马 BMW-马年限量版","link":"https://www.apaipian.com/play/2319_8576.html","url":"group1/M01/00/DE/CgptuFt85xqASZloAAHOfFDI8aY261.jpg"},
{"id":"04","title":"宝马 BMW-BMW Group","link":"https://www.apaipian.com/play/2319_8588.html","url":"group1/M01/01/15/Cgpw7Ft0_m-AKKM8AAFqZUI0D80657.jpg"},
{"id":"04","title":"大众Volkswagen - 陪伴篇  ","link":"https://www.apaipian.com/play/2319_8590.html","url":"group1/M00/01/16/Cgpw7Ft859WAF5aAAAFQa6t67B4800.jpg"},
{"id":"04","title":"宝马 BMW-与坚持梦想者同行篇 ","link":"https://www.apaipian.com/play/2319_8733.html","url":"group1/M00/01/16/Cgpw7Ft87QmAQx52AAGGeGuNla4849.jpg"},
{"id":"04","title":"雷克萨斯 LEXUS - 信仰篇","link":"https://www.apaipian.com/play/2319_12982.html","url":"group1/M01/00/DE/CgptuFt9CJ6AAiByAAGRbQdtILw460.jpg"},
{"id":"04","title":"雷诺 Renault - 梅甘娜 Megane ","link":"https://www.apaipian.com/play/2319_12990.html","url":"group1/M00/00/27/CgpsbFienoeAXUufAAHOLi5Vlrc324.JPG"},
{"id":"04","title":"吉利 Geely - 一切为了人","link":"https://www.apaipian.com/play/2319_13245.html","url":"group1/M01/01/17/CgpmTlt9Cm-AV_k1AAHU92wWVac022.jpg"},
{"id":"04","title":"斯柯达 Skoda-昕动-专于智 慧于行","link":"https://www.apaipian.com/play/2319_22013.html","url":"group1/M01/00/DE/CgptuFt6jEOAdUmWAAGkdwlE9E4365.jpg"},
{"id":"04","title":"宝马 BMW-本色不改 驾趣如新","link":"https://www.apaipian.com/play/2319_24906.html","url":"group1/M01/00/DD/CgpsbFt9HvCAFahHAAHJocYjJ74029.jpg"},
{"id":"04","title":"DS-5-Samuel","link":"https://www.apaipian.com/play/2319_25682.html","url":"group1/M00/00/FF/CgpmTlrPC-yAKe4hAAHMTUf3CXo009.jpg"},
{"id":"04","title":"大众 Volkswagen-超越新里程","link":"https://www.apaipian.com/play/2319_26180.html","url":"group1/M01/00/DC/CgpsbFt6kq2AOwFdAAF0oSzSBYE374.jpg"},
{"id":"04","title":"林肯  Lincoln-大陆尊耀版","link":"https://www.apaipian.com/play/2319_28408.html","url":"group1/M00/00/FA/CgpmTlq8abeAHHtxAAJHu2wFZbY979.jpg"},
{"id":"04","title":"吉利 Geely-帝豪450-敢跑敢当","link":"https://www.apaipian.com/play/2319_28583.html","url":"group1/M00/00/C3/CgptuFrDQLGAT8bYAAEL9Tsj42c910.jpg"},
{"id":"04","title":"沃尔沃 Volvo-S60L","link":"https://www.apaipian.com/play/2319_31665.html","url":"group1/M01/00/DF/CgpsbFuGCdSAIFZVAAGtF0rnqPI273.jpg"},
{"id":"04","title":"丰田 Toyota-皇冠","link":"https://www.apaipian.com/play/2319_31677.html","url":"group1/M01/00/E0/CgptuFuGQWiADAXLAAGugWqtQ2Y139.jpg"},
{"id":"05","title":"奔驰 Mercedes Benz - E 300L","link":"https://www.apaipian.com/play/2319_2891.html","url":"group1/M01/00/E0/CgpsbFuM-aqAAF6NAAHxbew1LJE422.jpg"},
{"id":"05","title":"现代 索纳塔 Sonata - EXPERIENCE ","link":"https://www.apaipian.com/play/2319_3286.html","url":"group1/M01/00/E2/CgptuFuM-6GAMOmgAAE9J-MnSmc242.jpg"},
{"id":"05","title":"邓禄普-超越昨天的自己","link":"https://www.apaipian.com/play/2319_4222.html","url":"group1/M00/00/07/CgpsbFhl8QOAZJmfAAL2f747HbE772.jpg"},
{"id":"05","title":"现代 Hyundai - 雅科仕","link":"https://www.apaipian.com/play/2319_7699.html","url":"group1/M01/01/17/CgpmTlt08RmAbQoWAAHSNuBQh5c547.jpg"},
{"id":"05","title":"雪铁龙 Citroen-C6","link":"https://www.apaipian.com/play/2319_7995.html","url":"group1/M01/00/DE/CgptuFt082GAPvCkAAKKFBa4F6M485.jpg"},
{"id":"05","title":"雪铁龙 Citroen-DS5 White Pearl","link":"https://www.apaipian.com/play/2319_8201.html","url":"group1/M01/00/DC/CgpsbFt09giAZ9gAAAGiF01F6wQ644.jpg"},
{"id":"05","title":"宝马 BMW-Individual","link":"https://www.apaipian.com/play/2319_8619.html","url":"group1/M01/01/17/CgpmTlt1AIKAabZWAAI709J5XTU082.jpg"},
{"id":"05","title":"奔驰 Mercedes Benz - 星睿","link":"https://www.apaipian.com/play/2319_8816.html","url":"group1/M01/00/DE/CgptuFt6JhiAV5pzAAKNjr7KOiw174.jpg"},
{"id":"05","title":"奥迪 Audi - RS 3","link":"https://www.apaipian.com/play/2319_8903.html","url":"group1/M01/00/DE/CgptuFt6KiWAe19kAAHdujGHa8A976.jpg"},
{"id":"05","title":"菲亚特 Fiat-500x","link":"https://www.apaipian.com/play/2319_8913.html","url":"group1/M01/01/15/Cgpw7Ft6KraAUbBqAAFhN2cGCz4301.jpg"},
{"id":"05","title":"奔驰 Mercedes Benz - MIAS","link":"https://www.apaipian.com/play/2319_8922.html","url":"group1/M00/00/50/CgpmTlh7GJCAUya-AADqPKIDtaA801.jpg"},
{"id":"05","title":"奔驰 Mercedes Benz-C级","link":"https://www.apaipian.com/play/2319_9135.html","url":"group1/M01/00/DE/CgptuFt6NMiAey2LAAFf3Ga9dWk749.jpg"},
{"id":"05","title":"本田Honda -思域 TYPE-R","link":"https://www.apaipian.com/play/2319_9369.html","url":"group1/M01/01/17/CgpmTlt6OMKAdyaVAAGAa_rtM1c470.jpg"},
{"id":"05","title":"凯迪拉克 Cadillac-CTS V","link":"https://www.apaipian.com/play/2319_12916.html","url":"group1/M01/01/15/Cgpw7Ft6XViASL7wAAHBoffmRfE309.jpg"},
{"id":"05","title":"雷克萨斯 LEXUS - IS ","link":"https://www.apaipian.com/play/2319_12961.html","url":"group1/M01/01/16/Cgpw7Ft6Y4GAHVnDAAGYXc2LWTg341.jpg"},
{"id":"05","title":"雷克萨斯 LEXUS-ES","link":"https://www.apaipian.com/play/2319_12976.html","url":"group1/M01/00/DE/CgptuFt6ZjWADxP6AAJqv6r1Fa4714.jpg"},
{"id":"05","title":"吉利 Geely - 新金刚","link":"https://www.apaipian.com/play/2319_13229.html","url":"group1/M01/01/17/CgpmTlt6d0qAedM4AAGFpSbSExU590.jpg"},
{"id":"05","title":"本田 Honda - 2017年初篇","link":"https://www.apaipian.com/play/2319_19457.html","url":"group1/M01/00/DE/CgptuFt6heSAFH5vAAJNTJVDG5Q060.jpg"},
{"id":"05","title":"奔驰 Mercedes Benz - 迈巴赫","link":"https://www.apaipian.com/play/2319_21988.html","url":"group1/M01/01/16/Cgpw7Ft6i4uAX0kXAAJTgyXz-AI345.jpg"},
{"id":"05","title":"现代 Hyundai-钢琴篇","link":"https://www.apaipian.com/play/2319_31668.html","url":"group1/M01/00/DF/CgpsbFuGQJuACz82AAE0-j_XuCk233.jpg"},
{"id":"06","title":"大众 Volkswagen-团队意识 协作精神","link":"https://www.apaipian.com/play/2319_23657.html","url":"group1/M01/00/DE/CgptuFt8xSaAETIIAAJfKfVcE20743.jpg"},
{"id":"06","title":"大众 Volkswagen-成功精神篇","link":"https://www.apaipian.com/play/2319_23675.html","url":"group1/M00/01/17/CgpmTlt8xeeAH99fAAIt4_zGe50530.jpg"},
{"id":"06","title":"宝马 BMW-售后保障服务","link":"https://www.apaipian.com/play/2319_24175.html","url":"group1/M00/01/16/Cgpw7Ft8x5aATRIZAAJGt01PlZM284.jpg"},
{"id":"06","title":"上海汽车 -荣威品质篇","link":"https://www.apaipian.com/play/2319_24187.html","url":"group1/M00/01/16/Cgpw7Ft8yDeAAkGuAAGy3wGg46U727.jpg"},
{"id":"06","title":"奔驰 Mercedes Benz-戴姆勒","link":"https://www.apaipian.com/play/2319_24330.html","url":"group1/M01/01/17/CgpmTlt8yTGAGd2CAAHOhqmD1Xo170.jpg"},
{"id":"06","title":"盈众大众4s店-员工篇","link":"https://www.apaipian.com/play/2319_26622.html","url":"group1/M01/01/17/CgpmTlt80IGAeDkgAAHkx_PwkQ0054.jpg"},
{"id":"06","title":"宝马 BMW-宝马的荣耀","link":"https://www.apaipian.com/play/2319_28513.html","url":"group1/M00/00/C3/CgptuFrDMkaALixaAAHIYb1ajwQ826.jpg"},
{"id":"06","title":"江铃 JMEV-为更好去前行","link":"https://www.apaipian.com/play/2319_31860.html","url":"group1/M01/01/19/Cgpw7FuI5RiAb13zAAIz7qZeJ2c270.jpg"},
{"id":"10","title":"宝马 BMW-一路风景篇","link":"https://www.apaipian.com/play/2319_1410.html","url":"group1/M01/00/DD/CgpsbFt9KIKAPRsQAAHNtXj8aFA613.jpg"},
{"id":"10","title":"丰田 Toyota-86 ","link":"https://www.apaipian.com/play/2319_2905.html","url":"group1/M01/00/DD/CgpsbFt9KP6AOo1KAAHs7wqgIeI033.jpg"},
{"id":"10","title":"保时捷 Porsche-细节展示篇","link":"https://www.apaipian.com/play/2319_22185.html","url":"group1/M01/00/DD/CgpsbFt9MCSAJjhcAAInStI2aEM958.jpg"},
{"id":"10","title":"雷克萨斯 LEXUS - LC500 晨曦篇","link":"https://www.apaipian.com/play/2319_22702.html","url":"group1/M01/01/17/CgpmTlt9ERSAGUKvAAG0env595s819.jpg"},
{"id":"11","title":"奔驰 Mercedes Benz - Drive","link":"https://www.apaipian.com/play/2319_4795.html","url":"group1/M00/00/41/Cgpw7FhnbZOAbfkjAAHtF9A2Qew973.jpg"},
{"id":"11","title":"捷豹 Jaguar- F-TYPE-非你莫属","link":"https://www.apaipian.com/play/2319_31717.html","url":"group1/M01/00/E0/CgptuFuGRryAbYmRAAHXPV0B1do642.jpg"},
{"id":"11","title":"大众 Volkswagen-极速无间-齐秦","link":"https://www.apaipian.com/play/2319_31726.html","url":"group1/M01/01/19/CgpmTluGScGAKCxxAAGKrZeI_DE957.jpg"},
{"id":"11","title":"雷克萨斯 LEXUS-影藏-李李仁","link":"https://www.apaipian.com/play/2319_31749.html","url":"group1/M01/01/18/Cgpw7FuGSuaAVpsuAAGwB1zSbLQ969.jpg"},
{"id":"12","title":"奥迪 Audi-速度环","link":"https://www.apaipian.com/play/2319_31752.html","url":"group1/M01/00/DF/CgpsbFuGS2iAILP9AAG1qr-P7M4962.jpg"},
{"id":"12","title":"奥迪 Audi-创新实验室","link":"https://www.apaipian.com/play/2319_31754.html","url":"group1/M01/00/DF/CgpsbFuGTCCAKbtMAAFHiQvZO0g934.jpg"},
{"id":"12","title":"宝马 BMW-i8","link":"https://www.apaipian.com/play/2319_32047.html","url":"group1/M01/00/E2/CgptuFuM9B2AIdw_AAHZkFn8Zt0909.jpg"},
{"id":"12","title":"现代 Hyundai-IONIQ","link":"https://www.apaipian.com/play/2319_32042.html","url":"group1/M01/01/1B/CgpmTluM85WAHkmQAAGV2dl8itE711.jpg"},
{"id":"13","title":"雪佛兰 Chevrolet-科迈罗","link":"https://www.apaipian.com/play/2319_988.html","url":"group1/M01/01/19/Cgpw7FuM-DOAK2L1AAE6CNSjH70681.jpg"},
{"id":"13","title":"劳斯莱斯 Rolls Royce-魅影","link":"https://www.apaipian.com/play/2319_12921.html","url":"group1/M01/00/DC/CgpsbFt6Xu6ALXsXAAIenMsvx6o855.jpg"},
{"id":"13","title":"奥迪 Audi - TTS","link":"https://www.apaipian.com/play/2319_24075.html","url":"group1/M01/01/17/CgpmTlt6jyCAXs31AAGmm5lxwX8162.jpg"},
{"id":"13","title":"宝马 BMW-i8-互联驾驶篇","link":"https://www.apaipian.com/play/2319_31756.html","url":"group1/M01/01/19/CgpmTluGTPiAFzclAAGIew0rkTc941.jpg"},
{"id":"14","title":"现代 Hyundai - 雪山篇","link":"https://www.apaipian.com/play/2319_3274.html","url":"group1/M01/01/19/Cgpw7FuM-wWANWZSAAIZTv9ICR8012.jpg"},
{"id":"14","title":"雷克萨斯 LEXUS -豪华艺术论","link":"https://www.apaipian.com/play/2319_26680.html","url":"group1/M01/00/DE/CgptuFt9LsiANhxDAAKactkABKI998.jpg"},
{"id":"14","title":"宝马 BMW-i8-官方篇","link":"https://www.apaipian.com/play/2319_31678.html","url":"group1/M01/00/DF/CgpsbFuGQ62ALU8YAAHOnv3mwX4757.jpg"},
{"id":"14","title":"奥迪 Audi-R8-基因篇","link":"https://www.apaipian.com/play/2319_31705.html","url":"group1/M01/01/18/Cgpw7FuGQqmAEh9qAAKsUkCXQv0691.jpg"},
{"id":"15","title":"奔驰 Mercedes Benz - 2016款","link":"https://www.apaipian.com/play/2319_8834.html","url":"group1/M01/01/16/Cgpw7Ft_xgaADijrAAGsz1-ODfk902.jpg"},
{"id":"15","title":"宾利 Bentley-GT Speed2","link":"https://www.apaipian.com/play/2319_9522.html","url":"group1/M01/00/DD/CgpsbFt_yKWAKD4OAAIAwt3chlY895.jpg"},
{"id":"15","title":"雷克萨斯 LEXUS - RC","link":"https://www.apaipian.com/play/2319_12960.html","url":"group1/M01/01/15/Cgpw7Ft6YuSAZfyNAAJjwSh3lLo060.jpg"},
{"id":"15","title":"迈凯伦 McLaren-Sports Series","link":"https://www.apaipian.com/play/2319_32051.html","url":"group1/M01/01/19/Cgpw7FuM9YmAPbXnAAGX4aeFK6w576.jpg"},
{"id":"16","title":"佛吉亚 Faurecia","link":"https://www.apaipian.com/play/2319_26554.html","url":"group1/M01/01/17/CgpmTlt8z-qACgkUAAIocl7mD8w622.jpg"},
{"id":"16","title":"东风标致 Peugot-眺望篇","link":"https://www.apaipian.com/play/827_1815.html","url":"group1/M01/00/DD/CgpsbFt78BGAMRy7AAEXIMXXWQg400.jpg"},
{"id":"16","title":"宝马 BMW-JTE","link":"https://www.apaipian.com/play/1088_3980.html","url":"group1/M01/01/17/CgpmTlt78JaARB_WAAHT3cNXkcw869.jpg"},
{"id":"16","title":"宝马 BMW-宝信行4S店","link":"https://www.apaipian.com/play/1448_18387.html","url":"group1/M01/00/DE/CgptuFt8xHWAbPBHAAGm764uu5k100.jpg"},
{"id":"20","title":"宾利 Bentley-GT Speed","link":"https://www.apaipian.com/play/2319_9524.html","url":"group1/M01/01/17/CgpmTlt9Jz6AdmaBAAFxYlbJrOM986.jpg"},
{"id":"20","title":"捷豹 Jaguar - F Type","link":"https://www.apaipian.com/play/2319_13259.html","url":"group1/M01/01/16/Cgpw7Ft9L2OAJZcrAAKuRFs34xs298.jpg"},
{"id":"20","title":"沃尔沃 Volvo-XC90","link":"https://www.apaipian.com/play/2319_31666.html","url":"group1/M01/00/E0/CgptuFuGCsyAVwO4AAGtF0rnqPI281.jpg"},
{"id":"20","title":"宝马 BMW-100周年篇","link":"https://www.apaipian.com/play/2319_31679.html","url":"group1/M01/01/18/Cgpw7FuGTzuAbVLBAAG2oWkrHSM321.jpg"},
{"id":"20","title":"兰博基尼 Lamborghini-2013","link":"https://www.apaipian.com/play/2319_31699.html","url":"group1/M01/01/19/CgpmTluGVH2AR9OwAAGxpuiGUHA025.jpg"},
{"id":"20","title":"兰博基尼 Lamborghini-Superleggera","link":"https://www.apaipian.com/play/2319_31700.html","url":"group1/M01/00/DF/CgpsbFuGVVOADTOKAAEym38CMcY432.jpg"},
{"id":"20","title":"兰博基尼 Lamborghini-Urus","link":"https://www.apaipian.com/play/2319_31701.html","url":"group1/M01/00/DF/CgpsbFuGVmqAQkXKAAFrKp4nvcM548.jpg"},
{"id":"20","title":"兰博基尼 Lamborghini-变身篇","link":"https://www.apaipian.com/play/2319_31703.html","url":"group1/M01/01/18/Cgpw7FuGWAiANncyAAHJzqyqSMI048.jpg"},
{"id":"20","title":"兰博基尼 Lamborghini-Huracán","link":"https://www.apaipian.com/play/2319_31706.html","url":"group1/M01/01/18/Cgpw7FuGWM6AWBt6AAGa6Cesews173.jpg"},
{"id":"20","title":"迈凯伦 McLaren-12C","link":"https://www.apaipian.com/play/2319_31709.html","url":"group1/M01/00/DF/CgpsbFuGXtaAAq0TAAGMVZUoABQ766.jpg"},
{"id":"20","title":"迈凯伦 McLaren-黑天鹅","link":"https://www.apaipian.com/play/2319_31710.html","url":"group1/M01/01/18/Cgpw7FuGWkKAUuvNAAGVfrAQYG0205.jpg"},
{"id":"20","title":"迈凯伦 McLaren-Sports Series","link":"https://www.apaipian.com/play/2319_31713.html","url":"group1/M01/00/DF/CgpsbFuGW8WAdHOIAAHKoDEF-ks306.jpg"},
{"id":"20","title":"迈凯伦 McLaren-720s","link":"https://www.apaipian.com/play/2319_31716.html","url":"group1/M01/01/19/CgpmTluGXEqAL9SGAAEyDczJPts787.jpg"},
{"id":"20","title":"迈凯伦 McLaren-570S","link":"https://www.apaipian.com/play/2319_31723.html","url":"group1/M01/00/DF/CgpsbFuGUS-ADqcyAAK_fjgnz_4719.jpg"},
{"id":"20","title":"法拉利 Ferrari-过山车篇","link":"https://www.apaipian.com/play/2319_31757.html","url":"group1/M01/00/E0/CgptuFuGWbiAbBjuAAFV6uF1jJQ860.jpg"},
{"id":"20","title":"兰博基尼 Lamborghini-极速篇","link":"https://www.apaipian.com/play/2319_31761.html","url":"group1/M01/00/DF/CgpsbFuGUpKAZ044AAH6DLmTQPM458.jpg"},
{"id":"21","title":"捷豹 Jaguar- F-TYPE-非你莫属","link":"https://www.apaipian.com/play/2319_31717.html","url":"group1/M01/00/E0/CgptuFuGRryAbYmRAAHXPV0B1do642.jpg"},
{"id":"21","title":"大众 Volkswagen-极速无间-齐秦","link":"https://www.apaipian.com/play/2319_31726.html","url":"group1/M01/01/19/CgpmTluGScGAKCxxAAGKrZeI_DE957.jpg"},
{"id":"21","title":"汽车之家-村子里的超跑-十周年篇","link":"https://www.apaipian.com/play/2319_31734.html","url":"group1/M01/01/19/CgpmTluGYBWAK2N0AAICXEFNs_I432.jpg"},
{"id":"21","title":"保时捷 Porsche-Onze manier","link":"https://www.apaipian.com/play/2319_32050.html","url":"group1/M01/00/E2/CgptuFuM8BmATRwOAAF7gaJH6vs483.jpg"},
{"id":"21","title":"宝马 BMW-The Escape","link":"https://www.apaipian.com/play/2319_32070.html","url":"group1/M01/00/E0/CgpsbFuN8meANdVbAAG9KZRtTzs962.jpg"},
{"id":"21","title":"宝马 BMW-Hostage","link":"https://www.apaipian.com/play/2319_32071.html","url":"group1/M01/00/E0/CgpsbFuN8syAcjTwAAEx2WuNTS0916.jpg"},
{"id":"21","title":"宝马 BMW-Ticker","link":"https://www.apaipian.com/play/2319_32075.html","url":"group1/M01/01/19/Cgpw7FuN8yGARoxaAAE9GeMur-g890.jpg"},
{"id":"21","title":"宝马 BMW-Cheadle","link":"https://www.apaipian.com/play/2319_32076.html","url":"group1/M01/01/1B/Cgpw7FuZ7SGAH3wzAAFh42e0pCU265.jpg"},
{"id":"22","title":"F1演变史","link":"https://www.apaipian.com/play/2319_31737.html","url":"group1/M01/00/DF/CgpsbFuGYtGAXyXZAAE0Qvds7_w361.jpg"},
{"id":"22","title":"GoSpring-Car wash","link":"https://www.apaipian.com/play/2319_31740.html","url":"group1/M01/00/E0/CgptuFuGYNWAD7PEAAGIADzrw58745.jpg"},
{"id":"22","title":"Airtel-Car","link":"https://www.apaipian.com/play/2319_31747.html","url":"group1/M01/01/18/Cgpw7FuGYjmAYgMhAAFvBQ-fY6g991.jpg"},
{"id":"22","title":"新车与二手车费用对比","link":"https://www.apaipian.com/play/2319_31783.html","url":"group1/M01/00/E1/CgptuFuHdHqAW_VlAAD8oM44xaQ763.jpg"},
{"id":"23","title":"帕加尼 Pagani - Huayra","link":"https://www.apaipian.com/play/2319_5553.html","url":"group1/M01/00/E1/CgpsbFuZ7UCABW2GAAFbNiafGoc052.jpg"},
{"id":"23","title":"法拉利 Ferrari - Speciale 458","link":"https://www.apaipian.com/play/2319_8666.html","url":"group1/M01/01/15/Cgpw7Ft1AW2AGwCGAAF-GIbuFwg975.jpg"},
{"id":"23","title":"法拉利 Ferrari - Crew Faction","link":"https://www.apaipian.com/play/2319_8920.html","url":"group1/M01/01/17/CgpmTlt6K82AB5juAAGKhUWjci0917.jpg"},
{"id":"23","title":"迈凯伦 McLaren - P1  ","link":"https://www.apaipian.com/play/2319_13052.html","url":"group1/M01/00/DE/CgptuFt6cymAY7TDAAH2KOrBZRI885.jpg"},
{"id":"23","title":"捷豹 Jaguar - Launch","link":"https://www.apaipian.com/play/2319_13262.html","url":"group1/M01/00/DE/CgptuFt6ejWARbASAAKBPZp7COs371.jpg"},
{"id":"23","title":"捷豹 Jaguar - Cello","link":"https://www.apaipian.com/play/2319_13266.html","url":"group1/M01/00/DC/CgpsbFt6fPqAFPhlAAGr5xReVOg260.jpg"},
{"id":"23","title":"赛麟 Saleen-定义极致","link":"https://www.apaipian.com/play/2319_21917.html","url":"group1/M01/01/16/Cgpw7Ft6ikCATysrAAFtY4ATRP8332.jpg"},
{"id":"23","title":"宝马 BMW-Z4","link":"https://www.apaipian.com/play/2319_31671.html","url":"group1/M01/00/DF/CgpsbFuGZLyAB9c2AAGwxzQ9a68389.jpg"},
{"id":"23","title":"法拉利 Ferrari-488","link":"https://www.apaipian.com/play/2319_31721.html","url":"group1/M01/01/19/CgpmTluGbl6AOpypAAFc-lRJL4U698.jpg"},
{"id":"23","title":"法拉利 Ferrari-Enzo","link":"https://www.apaipian.com/play/2319_31729.html","url":"group1/M01/01/19/CgpmTluGbzuAUKhsAAIbliABDrQ798.jpg"},
{"id":"23","title":"兰博基尼 Lamborghini-LP","link":"https://www.apaipian.com/play/2319_31755.html","url":"group1/M01/00/E0/CgptuFuGZyeAVvB2AAGIx1spbK4334.jpg"},
{"id":"23","title":"法拉利 Ferrari-极速篇","link":"https://www.apaipian.com/play/2319_31758.html","url":"group1/M01/01/19/CgpmTluGY9iASgXmAAHWPp51IwU977.jpg"},
{"id":"23","title":"兰博基尼 Lamborghini-Spyder","link":"https://www.apaipian.com/play/2319_31759.html","url":"group1/M01/01/18/Cgpw7FuGaAuAPx99AAHK3x3FunM282.jpg"},
{"id":"23","title":"宾尼法利纳 Pininfarina-GT","link":"https://www.apaipian.com/play/2319_31760.html","url":"group1/M01/00/E0/CgptuFuGaPCABuizAAH-Bbyq9iE199.jpg"},
{"id":"23","title":"迈凯伦 McLaren-720S","link":"https://www.apaipian.com/play/2319_31762.html","url":"group1/M01/01/1A/CgpmTluGcJyAXaAaAAF9re9IEyo767.jpg"},
{"id":"23","title":"布加迪 Bugatti-上海展示篇","link":"https://www.apaipian.com/play/2319_31773.html","url":"group1/M01/01/18/Cgpw7FuGZfWAQENyAAFKFJd-ofw280.jpg"},
{"id":"24","title":"法拉利 Ferrari-LEGEND","link":"https://www.apaipian.com/play/2319_8919.html","url":"group1/M01/00/DE/CgptuFt88a6AKX1CAAFib6kc3yQ414.jpg"},
{"id":"24","title":"迈凯轮 Mclcaren - super ","link":"https://www.apaipian.com/play/2319_13058.html","url":"group1/M01/01/16/Cgpw7Ft9CdGALTU8AAHPYgfqQpk549.jpg"},
{"id":"24","title":"布加迪 Bugatti-Divo","link":"https://www.apaipian.com/play/2319_31704.html","url":"group1/M01/00/E0/CgptuFuGbZKAStgnAAGHravpXTg531.jpg"},
{"id":"24","title":"法拉利 Ferrari-488 GTB","link":"https://www.apaipian.com/play/2319_31711.html","url":"group1/M01/01/1A/CgpmTluGca2Af3M9AALcGGlmg1o255.jpg"},
{"id":"25","title":"奥迪 Audi - R8 V10 Plus","link":"https://www.apaipian.com/play/2319_8901.html","url":"group1/M01/00/DE/CgptuFt6KQWAKC9XAAIMqeeW58Q086.jpg"},
{"id":"25","title":"捷豹 Jaguar - F-TYPE","link":"https://www.apaipian.com/play/2319_13261.html","url":"group1/M01/01/16/Cgpw7Ft6eR6AEHASAAIql1S7PM8093.jpg"},
{"id":"25","title":"帕加尼 Pagani - 细节展示篇","link":"https://www.apaipian.com/play/2319_24067.html","url":"group1/M01/00/DE/CgptuFt6jk-AMzhFAAHL5ncbwOg692.jpg"},
{"id":"25","title":"法拉利 Ferrari-575M","link":"https://www.apaipian.com/play/2319_31712.html","url":"group1/M01/01/1A/CgpmTluGfLiAEY9LAAHE_M4RLJ4812.jpg"},
{"id":"25","title":"迈凯伦 McLaren-揭秘篇","link":"https://www.apaipian.com/play/2319_31718.html","url":"group1/M01/00/E0/CgptuFuGdE6ALHTIAAGeUaqP-vc111.jpg"},
{"id":"25","title":"法拉利 Ferrari-Tailor Made","link":"https://www.apaipian.com/play/2319_31720.html","url":"group1/M01/01/1A/CgpmTluHVeGAcgKxAAFY7b5XoT0720.jpg"},
{"id":"25","title":"宾尼法利纳 Pininfarina-变化篇","link":"https://www.apaipian.com/play/2319_31722.html","url":"group1/M01/01/18/Cgpw7FuGd9SAdmqYAAEvoVdSGrI578.jpg"},
{"id":"25","title":"宾尼法利纳 Pininfarina-H2","link":"https://www.apaipian.com/play/2319_31724.html","url":"group1/M01/00/E0/CgptuFuGeJGASYzcAAGfjDSGzbA622.jpg"},
{"id":"25","title":"法拉利 Ferrari-Taruffi","link":"https://www.apaipian.com/play/2319_31725.html","url":"group1/M01/01/1A/CgpmTluHVm6ABUDgAAEbdkpR7ec558.jpg"},
{"id":"25","title":"法拉利 Ferrari-Berlinetta","link":"https://www.apaipian.com/play/2319_31727.html","url":"group1/M01/01/18/Cgpw7FuHV3OAbCrFAAHRaf3dOcc202.jpg"},
{"id":"25","title":"迈凯伦 McLaren-50周年","link":"https://www.apaipian.com/play/2319_31728.html","url":"group1/M01/00/E1/CgptuFuHYMyAELugAAFAmke_Nmc341.jpg"},
{"id":"25","title":"兰博基尼 Lamborghini-Huracán","link":"https://www.apaipian.com/play/2319_31730.html","url":"group1/M01/01/1A/CgpmTluGdNyAH0jVAAG5KwwfnUY090.jpg"},
{"id":"25","title":"赛麟 Saleen-S7","link":"https://www.apaipian.com/play/2319_31731.html","url":"group1/M01/00/E0/CgptuFuHWAGAGxjTAAGSbqPHorI678.jpg"},
{"id":"25","title":"布加迪 Bugatti-细节篇","link":"https://www.apaipian.com/play/2319_31735.html","url":"group1/M01/01/18/Cgpw7FuGecSAKOeWAAGzT5Pw9uE186.jpg"},
{"id":"25","title":"赛麟 Saleen-S7 Competition","link":"https://www.apaipian.com/play/2319_31736.html","url":"group1/M01/00/E0/CgptuFuHWKKAORdzAAGDe2XRwps603.jpg"},
{"id":"25","title":"迈凯伦 McLaren-720S RED","link":"https://www.apaipian.com/play/2319_31738.html","url":"group1/M01/01/18/Cgpw7FuHXhqAQNzaAAG39f_kze8066.jpg"},
{"id":"25","title":"法拉利 Ferrari-458 Ghost篇","link":"https://www.apaipian.com/play/2319_31743.html","url":"group1/M01/00/E0/CgptuFuGeweAQvDFAAGB3zD7YIE294.jpg"},
{"id":"25","title":"迈凯伦 McLaren-P1 细节版","link":"https://www.apaipian.com/play/2319_31744.html","url":"group1/M01/01/18/Cgpw7FuHX3-AA8icAAEsG_rafXM102.jpg"},
{"id":"25","title":"迈凯伦 McLaren-720s Redshift","link":"https://www.apaipian.com/play/2319_31745.html","url":"group1/M01/00/DF/CgpsbFuHX-6AH4jKAAHl3l9p_Jg450.jpg"},
{"id":"25","title":"法拉利 Ferrari-488 细节篇","link":"https://www.apaipian.com/play/2319_31751.html","url":"group1/M01/00/E0/CgptuFuGe-iARP5dAAIATVF7cfQ769.jpg"},
{"id":"26","title":"宝马 BMW-售后保障服务","link":"https://www.apaipian.com/play/2319_24175.html","url":"group1/M00/01/16/Cgpw7Ft8x5aATRIZAAJGt01PlZM284.jpg"},
{"id":"26","title":"兰博基尼 Lamborghini-Aventador","link":"https://www.apaipian.com/play/2319_31674.html","url":"group1/M01/00/E1/CgptuFuHYheASY5jAAG_r-XEtXg234.jpg"},
{"id":"26","title":"宝马 BMW-4S店篇","link":"https://www.apaipian.com/play/1947_25390.html","url":"group1/M01/00/DE/CgptuFt8zOuAXkBGAAHv0B8vfKM215.jpg"},
{"id":"26","title":"奥迪 Audi-创建未来","link":"https://www.apaipian.com/play/2021_26465.html","url":"group1/M01/01/16/Cgpw7Ft8zxOAUz2sAALMgkawgEc882.jpg"},
{"id":"30","title":"东风标致 Peugot-SAV  ","link":"https://www.apaipian.com/play/2319_9403.html","url":"group1/M00/00/50/Cgpw7Fh8lqeAO5iTAAFJelT3Msg982.jpg"},
{"id":"30","title":"别克 Buick - 昂科威 Envision ","link":"https://www.apaipian.com/play/2319_9415.html","url":"group1/M01/00/DC/CgpsbFt6PG2AF5-BAAIr5OoHKUI403.jpg"},
{"id":"30","title":"别克 Buick - 昂科威","link":"https://www.apaipian.com/play/2319_9417.html","url":"group1/M01/00/DC/CgpsbFt7feuAULBzAAGC5oSAgFg775.jpg"},
{"id":"30","title":"福特 Ford-探险者","link":"https://www.apaipian.com/play/2319_12404.html","url":"group1/M01/00/DD/CgpsbFt9LcaAY4cMAAI1RaqbC20423.jpg"},
{"id":"30","title":"雪佛兰 Chevrolet-科帕奇","link":"https://www.apaipian.com/play/2319_12904.html","url":"group1/M01/00/DC/CgpsbFt7gpGAb9IuAAIobzvHsQA637.jpg"},
{"id":"30","title":"吉利 Geely-博越-策马扬鞭篇 ","link":"https://www.apaipian.com/play/2319_13233.html","url":"group1/M01/00/DC/CgpsbFt7gzKAdH3mAAP9lb7rMs8839.jpg"},
{"id":"30","title":"吉利 Geely-博越-对牛弹琴篇","link":"https://www.apaipian.com/play/2319_13234.html","url":"group1/M01/01/17/CgpmTlt7g9OAcFm2AAH_ABRIKb0962.jpg"},
{"id":"30","title":"吉利 Geely-博越-全副武装篇","link":"https://www.apaipian.com/play/2319_13235.html","url":"group1/M01/00/DE/CgptuFt7hGWAYIBmAAJtRepY3Kg978.jpg"},
{"id":"30","title":"吉利 Geely-博越-绅士风度篇","link":"https://www.apaipian.com/play/2319_13236.html","url":"group1/M01/00/DC/CgpsbFt7hNeAO6yjAAFu8iYuLNs763.jpg"},
{"id":"30","title":"吉利 Geely-博越-一目了然篇","link":"https://www.apaipian.com/play/2319_13237.html","url":"group1/M01/01/16/Cgpw7Ft7hWqAdOksAAI7bN9SAdo091.jpg"},
{"id":"30","title":"吉利 Geely-博越-刹车篇","link":"https://www.apaipian.com/play/2319_13238.html","url":"group1/M01/00/DC/CgpsbFt7hfyAcJ5LAAJJ8ndjoEo390.jpg"},
{"id":"30","title":"奇瑞 Chery-5X-精彩无限篇","link":"https://www.apaipian.com/play/2319_23318.html","url":"group1/M01/00/DE/CgptuFt9GjiAFP4bAAIoZkwAZus163.jpg"},
{"id":"30","title":"长安-CS95荣耀版-鬼畜版","link":"https://www.apaipian.com/play/2319_24300.html","url":"group1/M01/00/DE/CgptuFt7imWAEL5fAAHG2lkIpCE632.jpg"},
{"id":"30","title":"大众 Volkswagen-途观-惊喜篇","link":"https://www.apaipian.com/play/2319_26225.html","url":"group1/M01/00/DC/CgpsbFt7i3SABN33AAHalvTdrBY918.jpg"},
{"id":"30","title":"凯翼 COWIN RUTO-X3-快递篇","link":"https://www.apaipian.com/play/2319_28382.html","url":"group1/M00/00/C1/CgptuFq9pU6AdmHGAAIHGSzh8Gw839.jpg"},
{"id":"30","title":"路虎 Landrover-发现神行","link":"https://www.apaipian.com/play/2319_30471.html","url":"group1/M00/00/D5/CgpsbFsLqKeAYFB4AAH-cucYxtU262.jpg"},
{"id":"30","title":"比亚迪 BYD-唐-冰雕篇","link":"https://www.apaipian.com/play/2319_31739.html","url":"group1/M01/00/DF/CgpsbFuHY4aAbWmvAAJcmfLM75E261.jpg"},
{"id":"30","title":"本田 Honda - BR-V","link":"https://www.apaipian.com/play/2319_31741.html","url":"group1/M01/00/DF/CgpsbFuHaGOAJ4BgAALhGR-iRa0782.jpg"},
{"id":"30","title":"比亚迪 BYD-宋-双色更出色","link":"https://www.apaipian.com/play/2319_31746.html","url":"group1/M01/01/1A/CgpmTluHZFWATplBAAIZV0mG9Ss043.jpg"},
{"id":"30","title":"比亚迪 BYD-唐-垂钓篇","link":"https://www.apaipian.com/play/2319_31750.html","url":"group1/M01/00/E1/CgptuFuHZxiASY9uAAHStbmPOWE818.jpg"},
{"id":"31","title":"福特 Ford-E和弦-雨后","link":"https://www.apaipian.com/play/2319_12443.html","url":"group1/M00/01/17/CgpmTlt71leABeSwAAIxALWdQLI784.jpg"},
{"id":"31","title":"林肯 Lincoln-MKC-旅行篇","link":"https://www.apaipian.com/play/2319_13014.html","url":"group1/M01/01/16/Cgpw7Ft6akaAKzOWAAG4dRRxxbE267.jpg"},
{"id":"31","title":"林肯 Lincoln-MKX-纪念日篇","link":"https://www.apaipian.com/play/2319_13015.html","url":"group1/M01/01/16/Cgpw7Ft6abaAEyLNAAJd6wunYLs557.jpg"},
{"id":"31","title":"林肯 Lincoln-MKC-星动一刻篇","link":"https://www.apaipian.com/play/2319_13017.html","url":"group1/M01/01/17/CgpmTlt6axKAbBvpAAIyRoDbQvk108.jpg"},
{"id":"31","title":"林肯 Lincoln-MKC-越洋惊喜篇","link":"https://www.apaipian.com/play/2319_13018.html","url":"group1/M01/00/DE/CgptuFt6bAeAQBYfAAJeG6_oI8k174.jpg"},
{"id":"31","title":"宝沃 BorgWard-千挑万选不如一见钟情","link":"https://www.apaipian.com/play/2319_18712.html","url":"group1/M01/01/16/Cgpw7Ft74HCAF_kWAAG9FB_bb-c392.jpg"},
{"id":"31","title":"丰田 Toyota-去做你信的事","link":"https://www.apaipian.com/play/2319_23059.html","url":"group1/M01/00/DC/CgpsbFt75YyAWhisAAFCkpWzzUU286.jpg"},
{"id":"31","title":"广汽传祺-阿爸的礼物","link":"https://www.apaipian.com/play/2319_24052.html","url":"group1/M01/00/DE/CgptuFt75lqALIFcAAGOc7mcZp4864.jpg"},
{"id":"31","title":"林肯 Lincoln-江疏影","link":"https://www.apaipian.com/play/2319_26198.html","url":"group1/M00/01/17/CgpmTlt76kKAKmavAAGg6QEtg1Y686.jpg"},
{"id":"31","title":"林肯 Lincoln-陈川-传承匠心","link":"https://www.apaipian.com/play/2319_26210.html","url":"group1/M01/00/DD/CgpsbFt76lKAJMONAAG1YvjJVbQ490.jpg"},
{"id":"31","title":"林肯 Lincoln-查可欣-聆音","link":"https://www.apaipian.com/play/2319_26385.html","url":"group1/M00/01/17/CgpmTlt76x-AbBH1AAFjtRTwSiw423.jpg"},
{"id":"31","title":"林肯 Lincoln-胡军-在路上","link":"https://www.apaipian.com/play/2319_26386.html","url":"group1/M01/00/DE/CgptuFt76jGAJZ4_AAJ6pYJoJUE185.jpg"},
{"id":"31","title":"林肯 Lincoln-小包总杨烁","link":"https://www.apaipian.com/play/2319_26972.html","url":"group1/M01/00/DE/CgptuFt6lLWAbzh9AAHwWeNSjV8725.jpg"},
{"id":"31","title":"宝马 BMW-神奇爸爸","link":"https://www.apaipian.com/play/2319_31764.html","url":"group1/M01/01/18/Cgpw7FuHbvyAT9gCAAGhOreTGBA930.jpg"},
{"id":"31","title":"路虎 Landrover-最长的1秒钟","link":"https://www.apaipian.com/play/2319_31766.html","url":"group1/M01/01/18/Cgpw7FuHcHSAMCQRAAFfbdm4rFY263.jpg"},
{"id":"31","title":"丰田 Toyota-愛情也需要保养","link":"https://www.apaipian.com/play/2319_31771.html","url":"group1/M01/01/18/Cgpw7FuHb6iAGR2sAAEKlerfM7Y191.jpg"},
{"id":"32","title":"SEAT Service-Lentretie","link":"https://www.apaipian.com/play/2319_31767.html","url":"group1/M01/00/DF/CgpsbFuHdzOAcVdxAAEruJVoBNI177.jpg"},
{"id":"32","title":"The Car Buying Service","link":"https://www.apaipian.com/play/2319_31768.html","url":"group1/M01/00/E1/CgptuFuHd8iAHCvNAAF_5UKR4fQ081.jpg"},
{"id":"32","title":"尾气与全球变暖","link":"https://www.apaipian.com/play/2319_31774.html","url":"group1/M01/00/E1/CgptuFuHcWmAVtFlAAIcbPYOzJs689.jpg"},
{"id":"32","title":"别克 Buick-Miller","link":"https://www.apaipian.com/play/2319_31775.html","url":"group1/M01/00/E1/CgptuFuHcg-AXhSmAAEvHFLy51c138.jpg"},
{"id":"32","title":"Auto Repair","link":"https://www.apaipian.com/play/2319_31778.html","url":"group1/M01/00/DF/CgpsbFuHctaAc-RtAAF4oh54Las823.jpg"},
{"id":"32","title":"Car-行驶路线","link":"https://www.apaipian.com/play/2319_31779.html","url":"group1/M01/01/1A/CgpmTluHc76AOVQlAAD3niqmuYQ286.jpg"},
{"id":"32","title":"一场意外的事故","link":"https://www.apaipian.com/play/2319_31795.html","url":"group1/M01/00/E1/CgptuFuHdeGAZHSNAAHqUOCWqQk913.jpg"},
{"id":"32","title":"Road Safety","link":"https://www.apaipian.com/play/2319_31800.html","url":"group1/M01/00/E1/CgptuFuHdn2AT9JjAAGN_RNHqdY777.jpg"},
{"id":"33","title":"奇瑞 Chery-新瑞虎5-功能篇","link":"https://www.apaipian.com/play/2319_989.html","url":"group1/M01/01/19/Cgpw7FuM-HSAHZKRAAH5AjVDm4U497.jpg"},
{"id":"33","title":" 广汽传祺-GS4-挑战冰雪","link":"https://www.apaipian.com/play/2319_4388.html","url":"group1/M00/00/41/CgpmTlhmUaiALUFoAAI2aEv6WeI051.jpg"},
{"id":"33","title":"本田 Honda-广本缤智","link":"https://www.apaipian.com/play/2319_4393.html","url":"group1/M01/00/E0/CgpsbFuM_Z6AT205AAFZy0Grd3o676.jpg"},
{"id":"33","title":"吉利 Geely -博越-冰雪试驾篇","link":"https://www.apaipian.com/play/2319_4396.html","url":"group1/M00/00/41/CgpmTlhmUTqAIYaIAAHcFvFBBu0088.jpg"},
{"id":"33","title":"起亚 KIA - 智跑","link":"https://www.apaipian.com/play/2319_5826.html","url":"group1/M01/01/17/CgpmTlt0BKiAP4B-AAHnLnoeho4776.jpg"},
{"id":"33","title":"起亚 KIA-KX5-滑翔测试篇","url":"https://www.apaipian.com/play/2319_5872.html","undefined":"group1/M01/00/DC/CgpsbFt0B32ASnAUAAHLhyTZPiE684.jpg"},
{"id":"33","title":"奔驰 Mercedes Benz-GLA","link":"https://www.apaipian.com/play/2319_9096.html","url":"group1/M01/01/17/CgpmTlt6Mw6AO-AqAAIgbTQTCZQ714.jpg"},
{"id":"33","title":"本田 Honda-Road music","link":"https://www.apaipian.com/play/2319_9353.html","url":"group1/M01/01/17/CgpmTlt6N4KAKRtCAAGDvF6iQ-U917.jpg"},
{"id":"33","title":"汉腾 - X7","link":"https://www.apaipian.com/play/2319_12698.html","url":"group1/M01/01/15/Cgpw7Ft6Q82AISGFAAHRoRhxyCQ553.jpg"},
{"id":"33","title":"奔驰 Mercedes Benz - GLC300","link":"https://www.apaipian.com/play/2319_12740.html","url":"group1/M01/01/15/Cgpw7Ft6RNSAaemBAAFAmx9dJgQ710.jpg"},
{"id":"33","title":"路虎 Landrover-发现  ","link":"https://www.apaipian.com/play/2319_13026.html","url":"group1/M01/01/16/Cgpw7Ft6bSSAEg3XAAHyQBJQW1I663.jpg"},
{"id":"33","title":"路虎 Landrover-全新揽胜","link":"https://www.apaipian.com/play/2319_13043.html","url":"group1/M01/00/DC/CgpsbFt6cV-ADNlRAAH6n1EIHLk462.jpg"},
{"id":"33","title":"吉利 Geely - 冰雪试驾篇","link":"https://www.apaipian.com/play/2319_13231.html","url":"group1/M01/00/DC/CgpsbFt6d-6AK1E9AAGZKQjsEFs575.jpg"},
{"id":"33","title":"斯巴鲁 Subaru-狗狗的旅行篇","link":"https://www.apaipian.com/play/2319_14664.html","url":"group1/M01/01/16/Cgpw7Ft6fyeAMjICAAJZ5wRzm5Y189.jpg"},
{"id":"33","title":"起亚KIA -KX5-悬崖挑战","link":"https://www.apaipian.com/play/2319_14751.html","url":"group1/M01/01/17/CgpmTlt6gQWAQuH9AAM9uTaK6I8384.jpg"},
{"id":"33","title":"奇瑞 Chery-瑞虎7-2018款","link":"https://www.apaipian.com/play/2319_27681.html","url":"group1/M01/00/DE/CgptuFt6lhaAMbsVAAJlXpKVjZs181.jpg"},
{"id":"33","title":"众泰大迈 Domy- X7-功能篇","link":"https://www.apaipian.com/play/2319_27834.html","url":"group1/M00/00/BD/CgptuFqzZmOAHOGBAAIvL9Kw6Z4995.jpg"},
{"id":"33","title":"蔚来 NIO-ES8-路面测试篇 ","link":"https://www.apaipian.com/play/2319_31343.html","url":"group1/M00/00/D9/CgptuFsQ95aAWZtdAAENjatxa5I527.jpg"},
{"id":"33","title":"本田 Honda-CR-V","link":"https://www.apaipian.com/play/2319_31769.html","url":"group1/M01/00/E1/CgptuFuHeOyAe7d-AAGruUcGHP0376.jpg"},
{"id":"33","title":"福田 Foton-萨瓦纳","link":"https://www.apaipian.com/play/2319_31770.html","url":"group1/M01/01/18/Cgpw7FuHer2AY084AAGYke7t9iY039.jpg"},
{"id":"34","title":"别克 Buick-昂科拉","link":"https://www.apaipian.com/play/2319_4115.html","url":"group1/M01/00/DD/CgpsbFt83hyAMffrAAH5xfDn4xw165.jpg"},
{"id":"34","title":"荣威 Roewe-950","link":"https://www.apaipian.com/play/2319_6101.html","url":"group1/M01/00/DC/CgpsbFt06hSAeZnlAAHSQkwOWkc383.jpg"},
{"id":"34","title":"三菱 Mitsubishi-帕杰罗","link":"https://www.apaipian.com/play/2319_6107.html","url":"group1/M01/00/DC/CgpsbFt06umAV1qyAAJObfVFRvE852.jpg"},
{"id":"34","title":"宝马 BMW-X1","link":"https://www.apaipian.com/play/2319_8572.html","url":"group1/M01/00/DE/CgptuFt0_EKAUkixAAHdIFl_5So495.jpg"},
{"id":"34","title":"道奇Dodge-酷威-小男孩","link":"https://www.apaipian.com/play/2319_8600.html","url":"group1/M00/01/16/Cgpw7Ft86UeABQS8AAKCgvsUYzU671.jpg"},
{"id":"34","title":"华晨宝马 BMW-之诺","link":"https://www.apaipian.com/play/2319_8852.html","url":"group1/M01/00/DD/CgpsbFt87-KAEw__AAGNG1WVwus136.jpg"},
{"id":"34","title":"奥迪 Audi-Q7-引燃改变","link":"https://www.apaipian.com/play/2319_8866.html","url":"group1/M01/00/DD/CgpsbFt88M6AKc-xAALNstuTZeI199.jpg"},
{"id":"34","title":"道奇Dodge-酷威-小女孩","link":"https://www.apaipian.com/play/2319_12930.html","url":"group1/M00/01/16/Cgpw7Ft86h-AQtNFAAFNxXNokVE476.jpg"},
{"id":"34","title":"马自达 MAZDA-走自己的路","link":"https://www.apaipian.com/play/2319_13051.html","url":"group1/M01/00/DD/CgpsbFt9CTOAL7cvAAGkaYURcTo069.jpg"},
{"id":"34","title":"吉普 Jeep-邓超","link":"https://www.apaipian.com/play/2319_21942.html","url":"group1/M01/01/16/Cgpw7Ft6itOATETkAAEuQoKMOFc471.jpg"},
{"id":"34","title":"大众 Volkswagen-狗狗篇","link":"https://www.apaipian.com/play/2319_22978.html","url":"group1/M01/01/16/Cgpw7Ft9FAmATTCqAAG7ej4O8Kc309.jpg"},
{"id":"34","title":"路虎 Land Rover - 梦想篇","link":"https://www.apaipian.com/play/2319_23320.html","url":"group1/M01/01/16/Cgpw7Ft9GqKAOSPDAAG1_uVqQJg590.jpg"},
{"id":"34","title":"雪佛兰 Chevrolet -  探界者 独行者","link":"https://www.apaipian.com/play/2319_23588.html","url":"group1/M01/01/17/CgpmTlt9GyKAa6C3AAFe3jhJvZY381.jpg"},
{"id":"34","title":"比亚迪 BYD- 新能源领航篇","link":"https://www.apaipian.com/play/2319_23599.html","url":"group1/M01/00/DD/CgpsbFt9HGGANzqVAAF79QSLDs8230.jpg"},
{"id":"34","title":"凯迪拉克 Cadillac - 创乐之城","link":"https://www.apaipian.com/play/2319_24931.html","url":"group1/M01/00/DD/CgpsbFt9H0iANVrLAAHyntUNGiU760.jpg"},
{"id":"34","title":"雷克萨斯 LEXUS-韩庚","link":"https://www.apaipian.com/play/2319_27439.html","url":"group1/M01/01/17/CgpmTlt9Ig2AbKy4AAGcIozsHBE410.jpg"},
{"id":"34","title":"路虎 Landrover-发现的心 从未停止","link":"https://www.apaipian.com/play/2319_27561.html","url":"group1/M01/01/16/Cgpw7Ft9IoqAI89qAAM5QcqA7Jg052.jpg"},
{"id":"34","title":"路虎 Landrover-全新发现","link":"https://www.apaipian.com/play/2319_28300.html","url":"group1/M00/00/FA/CgpmTlq6F8OASZM4AAK_1ABZ3fA879.jpg"},
{"id":"34","title":"领克 Lynk & Co-户外篇","link":"https://www.apaipian.com/play/2319_29077.html","url":"group1/M00/00/C8/CgpsbFrXDHKASyWQAALCEwtotk0632.jpg"},
{"id":"34","title":"吉普 Jeep-73年,把一件事做彻底","link":"https://www.apaipian.com/play/2319_31772.html","url":"group1/M01/01/18/Cgpw7FuHllSAAlIHAAJZ8Zc6dzM229.jpg"},
{"id":"35","title":"雪铁龙 Citroen-DS","link":"https://www.apaipian.com/play/2319_8006.html","url":"group1/M01/01/17/CgpmTlt09QWARamgAAEQNl2Amnw139.jpg"},
{"id":"35","title":"英菲尼迪 Infiniti - EX","link":"https://www.apaipian.com/play/2319_8313.html","url":"group1/M00/00/4D/Cgpw7Fh4mv6AM9pIAAD17d8UJvk178.jpg"},
{"id":"35","title":"奔驰 Mercedes Benz-Galleries","link":"https://www.apaipian.com/play/2319_8931.html","url":"group1/M01/00/DE/CgptuFt6LtOAWCgcAAGjArWlbJ0670.jpg"},
{"id":"35","title":"路虎 Landrover-揽胜运动版","link":"https://www.apaipian.com/play/2319_13030.html","url":"group1/M01/01/16/Cgpw7Ft6breATazTAAIWdvHtmcs011.jpg"},
{"id":"35","title":"名爵-ZS","link":"https://www.apaipian.com/play/2319_28478.html","url":"group1/M00/00/C3/CgptuFrDPKqAaDeIAAJoClvHEwU601.jpg"},
{"id":"35","title":"长城 Great Wall-哈弗 H6","link":"https://www.apaipian.com/play/2319_28815.html","url":"group1/M00/00/C4/CgpsbFrNs1qAPbtUAAKT-uZtw8M761.jpg"},
{"id":"35","title":"本田 Honda-HR-V-惊奇篇","link":"https://www.apaipian.com/play/2319_31776.html","url":"group1/M01/01/1A/CgpmTluHlx-AciOJAAJh6pxRUBg945.jpg"},
{"id":"35","title":"本田 Honda-HR-V 特性篇","link":"https://www.apaipian.com/play/2319_31785.html","url":"group1/M01/00/E1/CgptuFuHmb6AKaY7AAGrFBf4CtQ301.jpg"},
{"id":"36","title":"吉利 Geely-设计理念篇","link":"https://www.apaipian.com/play/2319_4669.html","url":"group1/M01/00/DE/CgptuFtz6pKAdVyNAAHmqRpCBnA440.jpg"},
{"id":"36","title":"起亚 KIA-迈向未来","link":"https://www.apaipian.com/play/2319_5851.html","url":"group1/M00/00/05/CgqNZVhrtqWAJ9jgAAHk8G8_zrY238.jpg"},
{"id":"36","title":"上海大众 Volkswagen-30周年","link":"https://www.apaipian.com/play/2319_6369.html","url":"group1/M00/01/16/Cgpw7Ft8wfiAYXbBAAK3sq_DK3A120.jpg"},
{"id":"36","title":"奔驰 Mercedes Benz-十周年","link":"https://www.apaipian.com/play/2319_24043.html","url":"group1/M01/00/DD/CgpsbFt8xtSAc-E2AAIt4_zGe50223.jpg"},
{"id":"36","title":"宝马 BMW-致心治物","link":"https://www.apaipian.com/play/2319_26170.html","url":"group1/M01/00/DD/CgpsbFt8zNSATfpfAAIsOkTCFts303.jpg"},
{"id":"36","title":"路虎 Landrover-捷豹","link":"https://www.apaipian.com/play/2319_27101.html","url":"group1/M01/01/16/Cgpw7Ft80YCASunAAAEje-QjgG8354.jpg"},
{"id":"36","title":"比亚迪 BYD-梦想篇","link":"https://www.apaipian.com/play/2319_31798.html","url":"group1/M01/01/18/Cgpw7FuHmzWANbjbAAImZ43SLUc248.jpg"},
{"id":"36","title":"丰田 Toyota-成功篇","link":"https://www.apaipian.com/play/2319_31802.html","url":"group1/M01/01/1A/CgpmTluHm-qAJrzkAAFqGDu0XTA391.jpg"},
{"id":"40","title":"本田 Honda - Wagon Spada","link":"https://www.apaipian.com/play/2319_3004.html","url":"group1/M01/00/DD/CgpsbFt9LB2AQ-ibAAGh876hJ8k666.jpg"},
{"id":"40","title":"大众 Volkswagen-自拍篇","link":"https://www.apaipian.com/play/2319_6454.html","url":"group1/M00/00/0F/CgptuFhvnKOADePVAAFbGAhukoA931.jpg"},
{"id":"40","title":"大众 Volkswagen-魔法篇","link":"https://www.apaipian.com/play/2319_6455.html","url":"group1/M01/00/DD/CgpsbFt9D3yAftaqAAInw9NbagU549.jpg"},
{"id":"40","title":"大众 Volkswagen-名牌篇","link":"https://www.apaipian.com/play/2319_6456.html","url":"group1/M00/00/0F/CgptuFhvm2qAVp2DAAKrej4VAwU026.jpg"},
{"id":"40","title":"比亚迪 BYD-宋MAX-专家篇","link":"https://www.apaipian.com/play/2319_30596.html","url":"group1/M00/01/0D/CgpmTlr9BICADS53AAHe8Uu8YUY273.jpg"},
{"id":"40","title":"本田 Honda-Vanquility","link":"https://www.apaipian.com/play/2319_31781.html","url":"group1/M01/01/18/Cgpw7FuHqs2AXSdaAALkDu-Vr3s379.jpg"},
{"id":"40","title":"比亚迪 BYD-e6","link":"https://www.apaipian.com/play/2319_31784.html","url":"group1/M01/00/E1/CgptuFuHnSaAN0UdAAFuwdFfJIw497.jpg"},
{"id":"40","title":"本田 Honda-Gizmo","link":"https://www.apaipian.com/play/2319_31786.html","url":"group1/M01/00/E1/CgptuFuHnq6AaQIFAAGXej724bM870.jpg"},
{"id":"40","title":"本田 Honda-变幻篇","link":"https://www.apaipian.com/play/2319_31787.html","url":"group1/M01/00/E1/CgptuFuHnfGAZUd6AAE_WIa4T3c446.jpg"},
{"id":"40","title":"本田 Honda-战争篇","link":"https://www.apaipian.com/play/2319_31790.html","url":"group1/M01/00/E1/CgptuFuHn2-AA46eAAJS4jzLFOE035.jpg"},
{"id":"40","title":"比亚迪 BYD-宋 Max 2018","link":"https://www.apaipian.com/play/2319_31803.html","url":"group1/M01/00/E1/CgptuFuHnHqAMygiAALDSTwzQt0469.jpg"},
{"id":"40","title":"上汽通用五菱 SGMW-情侣版","link":"https://www.apaipian.com/play/2319_31804.html","url":"group1/M01/00/E1/CgptuFuHoDqAfoPcAAGVeZqOnHk158.jpg"},
{"id":"40","title":"上汽通用五菱 SGMW-家庭版","link":"https://www.apaipian.com/play/2319_31806.html","url":"group1/M01/00/E1/CgptuFuHoJ6AW6vrAAHLMWf9Iuo089.jpg"},
{"id":"40","title":"本田 Honda - N-Van ","link":"https://www.apaipian.com/play/2319_31809.html","url":"group1/M01/01/18/Cgpw7FuHoVyASluhAAFzYKRYoSA623.jpg"},
{"id":"40","title":"本田 Honda-非同凡享","link":"https://www.apaipian.com/play/2319_31811.html","url":"group1/M01/00/E1/CgptuFuHoguAc5pMAAHsHUYKP4o638.jpg"},
{"id":"40","title":"本田 Honda -奥德赛","link":"https://www.apaipian.com/play/2319_31817.html","url":"group1/M01/01/18/Cgpw7FuHqiyAU-0nAAIGiRdyEaY376.jpg"},
{"id":"41","title":"大众 Volkswagen-紧急出行篇","link":"https://www.apaipian.com/play/2319_12859.html","url":"group1/M01/01/17/CgpmTlt6TEeAScK1AAJicl3smxc354.jpg"},
{"id":"41","title":"大众 Volkswagen-凯文要休假篇","link":"https://www.apaipian.com/play/2319_12864.html","url":"group1/M01/01/17/CgpmTlt6TGGAGCTvAAH1NxVWCNQ854.jpg"},
{"id":"41","title":"大众 Volkswagen-篮球高手篇","link":"https://www.apaipian.com/play/2319_12869.html","url":"group1/M01/01/17/CgpmTlt6TVOAepC3AALk1m0QQOE624.jpg"},
{"id":"41","title":"大众 Volkswagen-你我在一起篇","link":"https://www.apaipian.com/play/2319_12876.html","url":"group1/M01/00/DC/CgpsbFt6TWqAW68-AAHEfYYDDlA855.jpg"},
{"id":"41","title":"大众 Volkswagen-失踪的孩子篇","link":"https://www.apaipian.com/play/2319_12882.html","url":"group1/M01/00/DC/CgpsbFt6TX6ALb1QAAI6rhWg-Ts328.jpg"},
{"id":"41","title":"大众 Volkswagen-吉米的大日子篇","link":"https://www.apaipian.com/play/2319_12919.html","url":"group1/M01/01/15/Cgpw7Ft6TZOACpQ6AAL2G70qAdg477.jpg"},
{"id":"41","title":"大众 Volkswagen-吉米的鬼主意篇","link":"https://www.apaipian.com/play/2319_12927.html","url":"group1/M01/01/15/Cgpw7Ft6TZ6ATmg9AAI10oHjTgs925.jpg"},
{"id":"41","title":"斯巴鲁 Subaru-选择斯巴鲁的理由","link":"https://www.apaipian.com/play/2319_12873.html","url":"group1/M01/00/E2/CgptuFuNBu-AFABgAAItr2Mqfl0924.jpg"},
{"id":"42","title":"新车与二手车费用对比","link":"https://www.apaipian.com/play/2319_31783.html","url":"group1/M01/00/E1/CgptuFuHdHqAW_VlAAD8oM44xaQ763.jpg"},
{"id":"42","title":"宝马 BMW-i8","link":"https://www.apaipian.com/play/2319_32047.html","url":"group1/M01/00/E2/CgptuFuM9B2AIdw_AAHZkFn8Zt0909.jpg"},
{"id":"42","title":"沃尔沃 Volvo-self driving","link":"https://www.apaipian.com/play/2319_32048.html","url":"group1/M01/01/19/Cgpw7FuM7u6AKxXZAAHhITDxQbc245.jpg"},
{"id":"42","title":"Omycar","link":"https://www.apaipian.com/play/2319_32044.html","url":"group1/M01/01/19/Cgpw7FuM8beAc04mAAFqOmdrWrM339.jpg"},
{"id":"43","title":"大众 Volkswagen-邓超","link":"https://www.apaipian.com/play/2319_6437.html","url":"group1/M00/00/08/Cgp_JVhvnNuAU6Q3AAESypUnwFA700.jpg"},
{"id":"43","title":"大众 Volkswagen-出游篇","link":"https://www.apaipian.com/play/2319_22063.html","url":"group1/M01/01/16/Cgpw7Ft9Dv2AN1HQAAI0aHB6RsY648.jpg"},
{"id":"43","title":"华晨金杯-750","link":"https://www.apaipian.com/play/2319_31788.html","url":"group1/M01/01/18/Cgpw7FuHsfiAcTydAAHm3ozTGgg813.jpg"},
{"id":"43","title":"比亚迪 BYD-e6","link":"https://www.apaipian.com/play/2319_31816.html","url":"group1/M01/01/1A/CgpmTluHsEqAIHW5AALHv-R4v_o664.jpg"},
{"id":"43","title":"比亚迪 BYD-在一起 更完美","link":"https://www.apaipian.com/play/2319_31834.html","url":"group1/M01/00/E1/CgptuFuHrtiAPiXdAAHfo5XanTw143.jpg"},
{"id":"43","title":"比亚迪 BYD-M6","link":"https://www.apaipian.com/play/2319_31836.html","url":"group1/M01/00/DF/CgpsbFuHrj-AZKbpAAHNel2ibag765.jpg"},
{"id":"43","title":"本田 Honda-2017版","link":"https://www.apaipian.com/play/2319_31845.html","url":"group1/M01/01/1A/CgpmTluHr4aAN8U8AAGpmDu98qA677.jpg"},
{"id":"43","title":"本田 Honda-BR-V","link":"https://www.apaipian.com/play/2319_31847.html","url":"group1/M01/01/18/Cgpw7FuHs0qAOT1_AAJFqmh-yuE268.jpg"},
{"id":"44","title":"东风日产-尼桑 Nissan-贵士","link":"https://www.apaipian.com/play/2319_3156.html","url":"group1/M00/01/16/Cgpw7Ft81v-ARv1HAAFvXkE-Ne0966.jpg"},
{"id":"44","title":"大众 Volkswagen-有所为","link":"https://www.apaipian.com/play/2319_8499.html","url":"group1/M01/00/DD/CgpsbFt85mmAR6nPAAJ-Tp_Br-U364.jpg"},
{"id":"44","title":"东风风行 - CM7","link":"https://www.apaipian.com/play/2319_8642.html","url":"group1/M01/01/17/CgpmTlt87CqADSnCAAFUuGVWomU876.jpg"},
{"id":"44","title":"广汽传祺-GM8-为爱上市-女版","link":"https://www.apaipian.com/play/2319_26917.html","url":"group1/M01/00/DE/CgptuFt9Ha2AKTF9AAF63L5c-s4073.jpg"},
{"id":"44","title":"广汽传祺-GM8-为爱上市-男版","link":"https://www.apaipian.com/play/2319_26947.html","url":"group1/M01/01/17/CgpmTlt9HWyAfKjQAAINu5CTfRo368.jpg"},
{"id":"44","title":"别克 Buick-GL8-Mand","link":"https://www.apaipian.com/play/2319_31799.html","url":"group1/M01/00/E1/CgptuFuHtayATY-fAAGvmFvTY4o321.jpg"},
{"id":"44","title":"别克 Buick-GL8-Lunch Teaser","link":"https://www.apaipian.com/play/2319_31814.html","url":"group1/M01/01/1A/CgpmTluHtkCAE6nLAAEJv5RPC4s689.jpg"},
{"id":"44","title":"别克 Buick-型格辣爸","link":"https://www.apaipian.com/play/2319_31819.html","url":"group1/M01/00/E1/CgptuFuHtzeAPtPeAAIVPlXBD14319.jpg"},
{"id":"44","title":"比亚迪 BYD-M6","link":"https://www.apaipian.com/play/2319_31820.html","url":"group1/M01/01/18/Cgpw7FuHvIuATmfmAAHg7zVXRC8630.jpg"},
{"id":"44","title":"东风风行-风行F600","link":"https://www.apaipian.com/play/2319_31821.html","url":"group1/M01/01/1A/CgpmTluHt-mASsZWAAIsluAGJ-c285.jpg"},
{"id":"44","title":"别克 Buick-GL8-Sitting","link":"https://www.apaipian.com/play/2319_31823.html","url":"group1/M01/00/DF/CgpsbFuHtISAA_WCAAHY8fB-Wy8703.jpg"},
{"id":"44","title":"别克 Buick-GL8-Master","link":"https://www.apaipian.com/play/2319_31825.html","url":"group1/M01/00/E1/CgptuFuHtSGAQAN8AALD3YZEzFQ234.jpg"},
{"id":"45","title":"吉利 Geely-出游篇","link":"https://www.apaipian.com/play/2319_8853.html","url":"group1/M01/00/DD/CgpsbFt_x9qAUWN6AAFm2W9fTTQ012.jpg"},
{"id":"45","title":"凯迪拉克 Cadillac - 加号篇","link":"https://www.apaipian.com/play/2319_12931.html","url":"group1/M01/00/DD/CgpsbFuBD_uAVOIWAAIfdjouHQc054.jpg"},
{"id":"45","title":"本田 Honda-父女篇","link":"https://www.apaipian.com/play/2319_31824.html","url":"group1/M01/00/E1/CgptuFuHvuSAHDgzAAH2lpila9A031.jpg"},
{"id":"45","title":"别克 Buick-GL6-细节版","link":"https://www.apaipian.com/play/2319_31830.html","url":"group1/M01/01/19/Cgpw7FuHvSSAVb-EAAHET3sXTHM137.jpg"},
{"id":"46","title":"衡水凯骐东风本田4S店","link":"https://www.apaipian.com/play/2319_27019.html","url":"group1/M01/01/17/CgpmTlt80QGABeCHAANOdoQl0Pw891.jpg"},
{"id":"46","title":"华晨金杯-服务篇","link":"https://www.apaipian.com/play/2319_31838.html","url":"group1/M01/00/DF/CgpsbFuHwF-AMBE8AAGHltdVxYs746.jpg"},
{"id":"46","title":"江铃福特-20年","link":"https://www.apaipian.com/play/2319_31861.html","url":"group1/M01/01/1A/CgpmTluI5uyAdE87AAH28xdLJB8036.jpg"},
{"id":"46","title":"江铃集团 JMCG","link":"https://www.apaipian.com/play/2319_31862.html","url":"group1/M01/00/DF/CgpsbFuI5k-AfDQhAAGpVsn1FZ8280.jpg"},
{"id":"50","title":"福田 Foton-祥菱","link":"https://www.apaipian.com/play/2319_31791.html","url":"group1/M01/01/1A/CgpmTluHxQeAbN2UAAI_Woi5ec4626.jpg"},
{"id":"50","title":"唐骏 T-KING -欧铃","link":"https://www.apaipian.com/play/2319_31796.html","url":"group1/M01/01/19/Cgpw7FuHw5CABD5AAAL7ThY3VKs325.jpg"},
{"id":"50","title":"中国重汽 Sinotruk-HOWO","link":"https://www.apaipian.com/play/2319_31797.html","url":"group1/M01/00/E1/CgptuFuHwQeAX6vwAAGq9N5nMEU881.jpg"},
{"id":"50","title":"江铃 JMC-超乎你的想象","link":"https://www.apaipian.com/play/2319_31839.html","url":"group1/M01/01/1A/CgpmTluHwZWAfwdEAAG3Z0dwJ2g870.jpg"},
{"id":"51","title":"诠峰汽车-陪伴","link":"https://www.apaipian.com/play/2319_31805.html","url":"group1/M01/01/19/Cgpw7FuHzEiAQRIPAAGJPFqGzSw987.jpg"},
{"id":"51","title":"江铃集团-爸爸篇","link":"https://www.apaipian.com/play/2319_32067.html","url":"group1/M01/00/E2/CgptuFuN8SiAWMWEAAHXO1bv79U948.jpg"},
{"id":"51","title":"My Fathers Truck","link":"https://www.apaipian.com/play/2319_32069.html","url":"group1/M01/01/19/Cgpw7FuN8NyAGoW2AAEjuSulU_M482.jpg"},
{"id":"51","title":"红岩汽车-偶遇篇","link":"https://www.apaipian.com/play/2319_32056.html","url":"group1/M01/01/19/Cgpw7FuN46-AUAQAAAHb0zBSwaU408.jpg"},
{"id":"52","title":"江淮康铃 JAC","link":"https://www.apaipian.com/play/2319_31807.html","url":"group1/M01/00/E1/CgptuFuIqpiAKJT8AAGTqr7_iBY421.jpg"},
{"id":"52","title":"上汽跃进-清明篇","link":"https://www.apaipian.com/play/2319_31808.html","url":"group1/M01/01/1A/CgpmTluIqg6ATPdVAAGbTCJxvao784.jpg"},
{"id":"52","title":"Freight Supply Chain","link":"https://www.apaipian.com/play/2319_31831.html","url":"group1/M01/00/E1/CgptuFuHziqAJe-cAAE9hcUFWi4896.jpg"},
{"id":"52","title":"Afaqy - 车辆管理","link":"https://www.apaipian.com/play/2319_31841.html","url":"group1/M01/00/DF/CgpsbFuIqZ6AY9V8AAFYF4SGPYU960.jpg"},
{"id":"53","title":"福田 Foton-使命必达篇","link":"https://www.apaipian.com/play/2319_31073.html","url":"group1/M01/01/19/Cgpw7FuIsC6ATfJyAAHHoKDrxs0348.jpg"},
{"id":"53","title":"福田 Foton-M3","link":"https://www.apaipian.com/play/2319_31846.html","url":"group1/M01/01/19/Cgpw7FuIroqAX9fnAAJDwUJA2Zs633.jpg"},
{"id":"53","title":"华晨金杯-赢在中国 运筹帷幄","link":"https://www.apaipian.com/play/2319_31852.html","url":"group1/M01/01/19/Cgpw7FuIsV2ANPMpAAFPo94UJdQ872.jpg"},
{"id":"53","title":"中国重汽 Sinotruk-巴西篇","link":"https://www.apaipian.com/play/2319_31853.html","url":"group1/M01/00/E1/CgptuFuIrHCAfqSJAAIOMlvo0_c950.jpg"},
{"id":"54","title":"上汽跃进-开场篇","link":"https://www.apaipian.com/play/2319_31832.html","url":"group1/M01/00/E1/CgptuFuIseSALkUKAAEAdtdem14560.jpg"},
{"id":"54","title":"江淮康铃 JAC-X5","link":"https://www.apaipian.com/play/2319_31850.html","url":"group1/M01/00/DF/CgpsbFuIrSmAWQ6hAAG2qps1ztQ939.jpg"},
{"id":"54","title":"福田 Foton-欧马可S3","link":"https://www.apaipian.com/play/2319_31854.html","url":"group1/M01/00/DF/CgpsbFuItzKAA31WAAIRcbRd9Ac906.jpg"},
{"id":"54","title":"福田 Foton-时代缔造传奇","link":"https://www.apaipian.com/play/2319_31858.html","url":"group1/M01/01/19/Cgpw7FuItl6AYY0OAAIG2S5t9Wc630.jpg"},
{"id":"55","title":"东风 DFAC-多利卡2018款","link":"https://www.apaipian.com/play/2319_31837.html","url":"group1/M01/00/DF/CgpsbFuIv0GARCljAAIR22ViLtk053.jpg"},
{"id":"55","title":"福田 Foton-时代M3","link":"https://www.apaipian.com/play/2319_31840.html","url":"group1/M01/00/E1/CgptuFuIxDWAGA1zAAG8tydBfDs649.jpg"},
{"id":"55","title":"江淮帅铃 JAC-威司达","link":"https://www.apaipian.com/play/2319_31843.html","url":"group1/M01/00/E1/CgptuFuIw5KAdqTfAAFJQ-ak5w0400.jpg"},
{"id":"55","title":"曼恩 MAN-no Van，a MAN","link":"https://www.apaipian.com/play/2319_31848.html","url":"group1/M01/01/19/Cgpw7FuIuF6AQuUKAAH-dIygXNE830.jpg"},
{"id":"56","title":"中国重汽 Sinotruk-辉煌篇","link":"https://www.apaipian.com/play/2319_31855.html","url":"group1/M01/00/E1/CgptuFuIyTeAQZasAAGLAABujlM169.jpg"},
{"id":"56","title":"江铃福特-20年","link":"https://www.apaipian.com/play/2319_31861.html","url":"group1/M01/01/1A/CgpmTluI5uyAdE87AAH28xdLJB8036.jpg"},
{"id":"56","title":"开瑞绿卡 Karry-运载城市的力量","link":"https://www.apaipian.com/play/2319_31863.html","url":"group1/M01/00/DF/CgpsbFuI4fOAQAlsAAFh4O-zGCg378.jpg"},
{"id":"56","title":"上汽跃进-国五品系上市篇","link":"https://www.apaipian.com/play/2319_31864.html","url":"group1/M01/01/1A/CgpmTluIxfaAfu-3AAGkAW345Tg354.jpg"},
{"id":"60","title":"中国重汽 Sinotruk-美女版","link":"https://www.apaipian.com/play/2319_31801.html","url":"group1/M01/00/E1/CgptuFuHxf6AAFUjAAGvieh0sYE208.jpg"},
{"id":"60","title":"福田 Foton-戴姆勒","link":"https://www.apaipian.com/play/2319_31869.html","url":"group1/M01/01/19/Cgpw7FuI9b-AVr0OAAGjIXbt9xk711.jpg"},
{"id":"60","title":"一汽解放青汽-J7","link":"https://www.apaipian.com/play/2319_31871.html","url":"group1/M01/01/1A/CgpmTluI60OAMM3QAANB8urMZj4268.jpg"},
{"id":"60","title":"中国重汽 Sinotruk-豪瀚","link":"https://www.apaipian.com/play/2319_31872.html","url":"group1/M01/00/E1/CgptuFuI9MuAH8rnAAKoXZ09U-I380.jpg"},
{"id":"61","title":"一汽解放青汽-路一直在","link":"https://www.apaipian.com/play/2319_31874.html","url":"group1/M01/00/E1/CgptuFuI-ZWAduclAAJDS1f0Qmw624.jpg"},
{"id":"61","title":"陕汽重卡-卡车梦想","link":"https://www.apaipian.com/play/2319_32057.html","url":"group1/M01/01/19/Cgpw7FuN7AeAAqdfAAF63xDi8-Q237.jpg"},
{"id":"61","title":"爱奔卡车-父亲","link":"https://www.apaipian.com/play/2319_32066.html","url":"group1/M01/01/19/Cgpw7FuN7nSAPG37AAHsbNDUZ8I072.jpg"},
{"id":"61","title":"陕汽重卡-卡车妈妈","link":"https://www.apaipian.com/play/2319_32074.html","url":"group1/M01/01/1B/CgpmTluN7S6AcRflAAIaFB8NWtM120.jpg"},
{"id":"62","title":"AmeriTrust","link":"https://www.apaipian.com/play/2319_31875.html","url":"group1/M01/01/1A/CgpmTluI-qmAUjagAAGMHn2jc7E308.jpg"},
{"id":"62","title":"曼恩 MAN-如何购车","link":"https://www.apaipian.com/play/2319_31877.html","url":"group1/M01/00/DF/CgpsbFuI_zeAPGBAAAGwxHv37hk603.jpg"},
{"id":"62","title":"The history of Food Truck","link":"https://www.apaipian.com/play/2319_31879.html","url":"group1/M01/00/DF/CgpsbFuI_I2AWXrYAAHNHi6LUjk392.jpg"},
{"id":"62","title":"Wedsite","link":"https://www.apaipian.com/play/2319_31880.html","url":"group1/M01/00/E1/CgptuFuI_gWAZp11AAGRRsVz_Bs446.jpg"},
{"id":"63","title":"福田 Foton-EST德国版","link":"https://www.apaipian.com/play/2319_31007.html","url":"group1/M01/00/DC/CgpsbFt6mgiALC9yAAHo_JcooJ4101.jpg"},
{"id":"63","title":"中国重汽 Sinotruk - 品质篇","link":"https://www.apaipian.com/play/2319_31881.html","url":"group1/M01/00/DF/CgpsbFuJALCARFD2AAFyrvngpKU584.jpg"},
{"id":"63","title":"曼恩 MAN-TeleMatics®","link":"https://www.apaipian.com/play/2319_31882.html","url":"group1/M01/01/1A/CgpmTluJBy-AK89NAAF-zESCjag592.jpg"},
{"id":"63","title":"5 Future Trucks & Buses","link":"https://www.apaipian.com/play/2319_31883.html","url":"group1/M01/01/19/Cgpw7FuJDGiATk72AAHbCsaKf7o141.jpg"},
{"id":"63","title":"东风柳汽-乘龙T7","link":"https://www.apaipian.com/play/2319_31884.html","url":"group1/M01/00/DF/CgpsbFuJGjKAWUdgAAF9_huAqFM839.jpg"},
{"id":"63","title":"一汽解放青汽-品质篇","link":"https://www.apaipian.com/play/2319_31885.html","url":"group1/M01/00/DF/CgpsbFuJFpuAdzZsAAIet2R3KGs930.jpg"},
{"id":"63","title":"东风 DFAC-天龙启航版","link":"https://www.apaipian.com/play/2319_31886.html","url":"group1/M01/01/19/Cgpw7FuJGO6AevJuAAHY-cJLUCM492.jpg"},
{"id":"63","title":"中国重汽 Sinotruk - SITRAK 6X2","link":"https://www.apaipian.com/play/2319_31887.html","url":"group1/M01/00/E1/CgptuFuJAcGACTCAAAGDfa2G9Vw754.jpg"},
{"id":"63","title":"东风 DFAC-天龙KC","link":"https://www.apaipian.com/play/2319_31888.html","url":"group1/M01/01/1A/CgpmTluJFxyAfFc0AAFtgTNoDS0891.jpg"},
{"id":"63","title":"曼恩 MAN-JURA","link":"https://www.apaipian.com/play/2319_31889.html","url":"group1/M01/01/19/Cgpw7FuJDdKAHldaAAJRB9a4xUs115.jpg"},
{"id":"63","title":"中国重汽 Sinotruk-品质篇 ","link":"https://www.apaipian.com/play/2319_31892.html","url":"group1/M01/01/19/Cgpw7FuJDr6AfTbcAAHejRz5qV8473.jpg"},
{"id":"63","title":"10 Future Trucks & Buses","link":"https://www.apaipian.com/play/2319_31894.html","url":"group1/M01/01/1A/CgpmTluJC9GAEYvpAAH61J5mMLk227.jpg"},
{"id":"63","title":"东风 DFAC-天龙KC 利器篇","link":"https://www.apaipian.com/play/2319_31899.html","url":"group1/M01/01/1A/CgpmTluJF8qAWQKxAAJVD3lMhzs629.jpg"},
{"id":"63","title":"江淮帅铃 JAC-中卡上市篇","link":"https://www.apaipian.com/play/2319_31901.html","url":"group1/M01/00/DF/CgpsbFuJG56AfFzGAAHEFD8R_K8473.jpg"},
{"id":"63","title":"沃尔沃 Volvo-VNX卡车","link":"https://www.apaipian.com/play/2319_31903.html","url":"group1/M01/01/19/Cgpw7FuJGvmAYNF5AAGKYaP_qH4918.jpg"},
{"id":"63","title":"陕汽德龙-全新M3000运煤之星","link":"https://www.apaipian.com/play/2319_31908.html","url":"group1/M01/01/19/Cgpw7FuLr2GANyUHAAF_JecupQg151.jpg"},
{"id":"63","title":"Top 7 Best & Comfortable Trucks","link":"https://www.apaipian.com/play/2319_31911.html","url":"group1/M01/01/1A/CgpmTluJEo6AasRJAAFjRPwh1Wk883.jpg"},
{"id":"63","title":"陕汽德龙-X3000黄金版","link":"https://www.apaipian.com/play/2319_31916.html","url":"group1/M01/00/E1/CgptuFuLsd-AA2Q6AAI3OLPu-Uo720.jpg"},
{"id":"63","title":"陕汽德龙-M30002017款","link":"https://www.apaipian.com/play/2319_31933.html","url":"group1/M01/01/19/Cgpw7FuLsKGACSsLAAGWVA-QdQ4212.jpg"},
{"id":"63","title":"陕汽德龙-X3000黄金之星","link":"https://www.apaipian.com/play/2319_31941.html","url":"group1/M01/00/E1/CgptuFuJHIKAezotAAHEFD8R_K8015.jpg"},
{"id":"64","title":"福田 Foton-欧曼 GTL","link":"https://www.apaipian.com/play/2319_31870.html","url":"group1/M01/00/DF/CgpsbFuI9qOAL3HeAAIpMdvzPRc407.jpg"},
{"id":"64","title":"江淮格尔发-K7","link":"https://www.apaipian.com/play/2319_31890.html","url":"group1/M01/01/1A/CgpmTluLuKKAEyMdAAI5RWJabww818.jpg"},
{"id":"64","title":"一汽解放青汽-55周年纪念宣","link":"https://www.apaipian.com/play/2319_31893.html","url":"group1/M01/00/E1/CgptuFuLtC-AQqlxAAGC3eWZm-M432.jpg"},
{"id":"64","title":"中国重汽 Sinotruk-7系","link":"https://www.apaipian.com/play/2319_31896.html","url":"group1/M01/00/E1/CgptuFuLsr6AR5DyAAFYJzFsTjM233.jpg"},
{"id":"64","title":"江淮帅铃 JAC-中卡上市篇","link":"https://www.apaipian.com/play/2319_31901.html","url":"group1/M01/00/DF/CgpsbFuJG56AfFzGAAHEFD8R_K8473.jpg"},
{"id":"64","title":"陕汽德龙-X3000黄金版","link":"https://www.apaipian.com/play/2319_31916.html","url":"group1/M01/00/E1/CgptuFuLsd-AA2Q6AAI3OLPu-Uo720.jpg"},
{"id":"64","title":"东风 DFAC-天龙旗舰技术篇","link":"https://www.apaipian.com/play/2319_31927.html","url":"group1/M01/00/E1/CgptuFuLtbWAf4plAAHncQHUT80183.jpg"},
{"id":"64","title":"东风 DFAC-天龙舰520","link":"https://www.apaipian.com/play/2319_31929.html","url":"group1/M01/01/19/Cgpw7FuLtnCAe7M0AAEyIFsz6RY467.jpg"},
{"id":"65","title":"中国重汽 Sinotruk-T7H","link":"https://www.apaipian.com/play/2319_31891.html","url":"group1/M01/00/E0/CgpsbFuL3QCAO40BAAFxiHZ_74U180.jpg"},
{"id":"65","title":"曼恩 MAN-T65","link":"https://www.apaipian.com/play/2319_31898.html","url":"group1/M01/00/E0/CgpsbFuL3j2AF-S8AAI6LkXsf9M160.jpg"},
{"id":"65","title":"曼恩 MAN-EBS基本功能篇","link":"https://www.apaipian.com/play/2319_31900.html","url":"group1/M01/01/1A/CgpmTluLugyAYtFCAAHZJMBQuOU282.jpg"},
{"id":"65","title":"曼恩 MAN-传动系介绍篇","link":"https://www.apaipian.com/play/2319_31904.html","url":"group1/M01/00/E0/CgpsbFuLuveAUouqAAIuulbvBrc769.jpg"},
{"id":"65","title":"曼恩 MAN-Energiequelle","link":"https://www.apaipian.com/play/2319_31913.html","url":"group1/M01/01/19/Cgpw7FuL5yWAZJCeAAHiB_5HFrs738.jpg"},
{"id":"65","title":"东风柳汽-乘龙H7专题片","link":"https://www.apaipian.com/play/2319_31918.html","url":"group1/M01/00/E0/CgpsbFuL6AWAZdZPAAIm_G95eCM375.jpg"},
{"id":"65","title":"沃尔沃 Volvo-尚格云顿一字马 ","link":"https://www.apaipian.com/play/2319_31920.html","url":"group1/M01/01/19/Cgpw7FuL6teAIjcXAAGcEeZt1Zk891.jpg"},
{"id":"65","title":"马恒达 Mahindra-2017版","link":"https://www.apaipian.com/play/2319_31935.html","url":"group1/M01/00/E3/CgptuFuZ7XaAACyCAAIUo1lK2QM093.jpg"},
{"id":"66","title":"西井科技 westwell-年会篇","link":"https://www.apaipian.com/play/9_27211.html","url":"group1/M00/00/BD/CgptuFqyLkaASivLAAHodPYhIbA306.jpg"},
{"id":"66","title":"江淮格尔发-品质篇","link":"https://www.apaipian.com/play/2319_31905.html","url":"group1/M01/00/E0/CgpsbFuMfjGAG4mdAAFgOcBkhIc748.jpg"},
{"id":"66","title":"一汽解放青汽-J6领航版","link":"https://www.apaipian.com/play/2319_31912.html","url":"group1/M01/00/E1/CgptuFuL7U-AWI99AAF0ptvWBpM174.jpg"},
{"id":"66","title":"中国重汽 Sinotruk-MC11","link":"https://www.apaipian.com/play/2319_31917.html","url":"group1/M01/01/1C/CgpmTluaDAWAO6OMAAHo0dmVh3U756.jpg"},
{"id":"66","title":"一汽解放-节油篇","link":"https://www.apaipian.com/play/2319_31922.html","url":"group1/M01/01/1A/CgpmTluMdqKAdK9gAAF2hDm4nH8320.jpg"},
{"id":"66","title":"徐工集团-汉风","link":"https://www.apaipian.com/play/2319_31936.html","url":"group1/M01/00/E1/CgptuFuMfKiAfhZ4AANC9l4vcGY008.jpg"},
{"id":"66","title":"东风柳汽-介绍","link":"https://www.apaipian.com/play/2319_31940.html","url":"group1/M01/00/E0/CgpsbFuL8wKAYe7LAAG_P2TA9zo644.jpg"},
{"id":"66","title":"德渝徐工-英文版","link":"https://www.apaipian.com/play/2319_31949.html","url":"group1/M01/01/1A/CgpmTluMe7eABgaJAALekyJ-nZ4798.jpg"},
{"id":"66","title":"徐工集团-2017篇","link":"https://www.apaipian.com/play/2319_31952.html","url":"group1/M01/01/1A/CgpmTluMfRyACX2lAAIuycEJTmk918.jpg"},
{"id":"66","title":"福田 Foton-戴姆勒","link":"https://www.apaipian.com/play/2319_31953.html","url":"group1/M01/00/E0/CgpsbFuMf3SAf7hWAAFvJg_xNOo705.jpg"},
{"id":"66","title":"一汽解放-2018官方版","link":"https://www.apaipian.com/play/2319_31955.html","url":"group1/M01/00/E1/CgptuFuL8RmAfRjMAAJ7rSjG9Ik613.jpg"},
{"id":"66","title":"一汽解放青汽-50周年","link":"https://www.apaipian.com/play/2319_31956.html","url":"group1/M01/00/E0/CgpsbFuL8mWALvokAAH3XFBYs0w688.jpg"},
{"id":"70","title":"三菱 Mitsubishi-Triton","link":"https://www.apaipian.com/play/2319_3184.html","url":"group1/M01/00/DE/CgptuFt9KuyAa7VpAAHymlpBL2o354.jpg"},
{"id":"70","title":"福特 Ford-F150 La nueva","link":"https://www.apaipian.com/play/2319_31914.html","url":"group1/M01/00/E0/CgpsbFuMg5iAbP65AAKawwGAD8o634.jpg"},
{"id":"70","title":"福特 Ford-F150 Cabina","link":"https://www.apaipian.com/play/2319_31919.html","url":"group1/M01/00/E0/CgpsbFuMhNmAe6arAAIDRa9R3eU186.jpg"},
{"id":"70","title":"本田 Honda-Ridgeline","link":"https://www.apaipian.com/play/2319_31921.html","url":"group1/M01/01/1A/CgpmTluMjtCAB0e_AAJXhIlLxRA979.jpg"},
{"id":"70","title":"福特 Ford-F150 Fall Campaign","link":"https://www.apaipian.com/play/2319_31925.html","url":"group1/M01/01/1A/CgpmTluMhyaAOiuuAAKOcd3iFJY684.jpg"},
{"id":"70","title":"福特 Ford-F150 Battle Tested","link":"https://www.apaipian.com/play/2319_31928.html","url":"group1/M01/01/1A/CgpmTluMh8KAR139AAJZTVC4xfs781.jpg"},
{"id":"70","title":"福特 Ford-F150 Combo","link":"https://www.apaipian.com/play/2319_31930.html","url":"group1/M01/01/19/Cgpw7FuMgFqACHehAAGdz4UytUw488.jpg"},
{"id":"70","title":"福特 Ford-F150 Off The Clock","link":"https://www.apaipian.com/play/2319_31932.html","url":"group1/M01/00/E0/CgpsbFuMiPWAISuwAAKkRxgCVrs668.jpg"},
{"id":"70","title":"福特 Ford-Ranger Kayak","link":"https://www.apaipian.com/play/2319_31934.html","url":"group1/M01/01/19/Cgpw7FuMifiAHt_eAAHHo9W4fkU530.jpg"},
{"id":"70","title":"福特 Ford-Ranger Paraglider","link":"https://www.apaipian.com/play/2319_31937.html","url":"group1/M01/01/1A/CgpmTluMikyADSxhAAHZIJa8OLY316.jpg"},
{"id":"70","title":"福特 Ford-Ranger 4X4","link":"https://www.apaipian.com/play/2319_31938.html","url":"group1/M01/01/19/Cgpw7FuMixWAHuN4AAJVPsW2Tw4556.jpg"},
{"id":"70","title":"福特 Ford-F150 Dynasty","link":"https://www.apaipian.com/play/2319_31939.html","url":"group1/M01/01/19/Cgpw7FuMgNaAetUWAAKWhIcA724995.jpg"},
{"id":"70","title":"福特 Ford-F150 Superduty","link":"https://www.apaipian.com/play/2319_31942.html","url":"group1/M01/00/E0/CgpsbFuMgU2ATqysAAHwOgK1ksU241.jpg"},
{"id":"70","title":"五十铃 Isuzu-D-MAX","link":"https://www.apaipian.com/play/2319_31943.html","url":"group1/M01/01/19/Cgpw7FuMi8iAa484AAIs3s6-YaA248.jpg"},
{"id":"70","title":"福特 Ford-F150 NFL","link":"https://www.apaipian.com/play/2319_31944.html","url":"group1/M01/00/E1/CgptuFuMjTCAGtHGAAHU0DsPMyM332.jpg"},
{"id":"70","title":"大众 Volkswagen-Amarok","link":"https://www.apaipian.com/play/2319_31945.html","url":"group1/M01/00/E0/CgpsbFuMjdCADrsTAAFBerrwiGc253.jpg"},
{"id":"70","title":"福特 Ford-F150 Going Big","link":"https://www.apaipian.com/play/2319_31946.html","url":"group1/M01/00/E1/CgptuFuMgeGALajTAAHXF5R6lD4943.jpg"},
{"id":"70","title":"五十铃 Isuzu-D-Max Fighter Jet","link":"https://www.apaipian.com/play/2319_31947.html","url":"group1/M01/01/19/Cgpw7FuMjGiACJ9oAAIW352WmfU370.jpg"},
{"id":"70","title":"福特 Ford-F150 Dedication","link":"https://www.apaipian.com/play/2319_31948.html","url":"group1/M01/01/1A/CgpmTluMguGAVdbUAAKawwGAD8o295.jpg"},
{"id":"70","title":"福特 Ford-F150 Next Catch","link":"https://www.apaipian.com/play/2319_31951.html","url":"group1/M01/01/19/Cgpw7FuMheqAQXWqAAFAyUelXGE239.jpg"},
{"id":"71","title":"福特 Ford-100 Days Of Dark","link":"https://www.apaipian.com/play/2319_31960.html","url":"group1/M01/01/19/Cgpw7FuMkB6AZNYHAAD7fjo_Wes989.jpg"},
{"id":"71","title":"大众 Volkswagen-Wolswagen","link":"https://www.apaipian.com/play/2319_31962.html","url":"group1/M01/00/E0/CgpsbFuMk8mAQlYeAAFJPfEng3s067.jpg"},
{"id":"71","title":"福特 Ford-Ranger FX4 情谊篇","link":"https://www.apaipian.com/play/2319_31964.html","url":"group1/M01/00/E0/CgpsbFuMkoaADKesAAG-KBRMuY8336.jpg"},
{"id":"71","title":"福特 Ford-Ranger Espelhos","link":"https://www.apaipian.com/play/2319_31969.html","url":"group1/M01/01/1A/CgpmTluMkxCAIPejAAFK7ebykg0632.jpg"},
{"id":"72","title":"江淮帅铃 JAC-T6","link":"https://www.apaipian.com/play/2319_31971.html","url":"group1/M01/01/19/Cgpw7FuMlu-AYDBnAAGK8jctVxc889.jpg"},
{"id":"72","title":"福特 Ford-F150 Type","link":"https://www.apaipian.com/play/2319_31972.html","url":"group1/M01/01/1A/CgpmTluMlG-AMoftAAGxt-QkBsU471.jpg"},
{"id":"72","title":"福特 Ford-F150 新款","link":"https://www.apaipian.com/play/2319_31974.html","url":"group1/M01/00/E0/CgpsbFuMlPCAIHLtAAH_kNxO6go274.jpg"},
{"id":"72","title":"塔塔 TATA","link":"https://www.apaipian.com/play/2319_31976.html","url":"group1/M01/01/1B/CgpmTluMlY-AUdgkAAHGllvhRgc073.jpg"},
{"id":"73","title":"福特 Ford-Ranger Raptor","link":"https://www.apaipian.com/play/2319_31966.html","url":"group1/M01/00/E1/CgptuFuMtc-AOp8AAAHVdOOlwus318.jpg"},
{"id":"73","title":"大众 Volkswagen-V6","link":"https://www.apaipian.com/play/2319_31967.html","url":"group1/M01/00/E0/CgpsbFuMtP-AA7PxAAGN-NnROpo845.jpg"},
{"id":"73","title":"福特 Ford-F150 Tough","link":"https://www.apaipian.com/play/2319_31977.html","url":"group1/M01/01/19/Cgpw7FuMl66ACnicAAGvnGOdiVc668.jpg"},
{"id":"73","title":"福特 Ford-Ranger Explore","link":"https://www.apaipian.com/play/2319_31986.html","url":"group1/M01/00/E0/CgpsbFuMmVCAXgZQAAHrKFscRCQ272.jpg"},
{"id":"73","title":"福特 Ford-Ranger test ","link":"https://www.apaipian.com/play/2319_31988.html","url":"group1/M01/00/E0/CgpsbFuMmG6ATGtBAAJREdO4xVo299.jpg"},
{"id":"73","title":"福特 Ford-Ranger product","link":"https://www.apaipian.com/play/2319_31989.html","url":"group1/M01/00/E0/CgpsbFuMpI-AEDK5AAGbdsScxPg788.jpg"},
{"id":"73","title":"美国通用 GMC-Sierra Denali","link":"https://www.apaipian.com/play/2319_31990.html","url":"group1/M01/01/1B/CgpmTluMpTOAQvb-AAHtGCtcswE675.jpg"},
{"id":"73","title":"五十铃 Isuzu-D-MAX Adventure","link":"https://www.apaipian.com/play/2319_31991.html","url":"group1/M01/00/E1/CgptuFuMp0-AWq5qAAIr-v4zydA886.jpg"},
{"id":"74","title":"三菱 Mitsubishi-men ","link":"https://www.apaipian.com/play/2319_3182.html","url":"group1/M01/01/16/Cgpw7Ft9KnCAemWTAAEqEO_7PUU789.jpg"},
{"id":"74","title":"三菱 Mitsubishi-women ","link":"https://www.apaipian.com/play/2319_3183.html","url":"group1/M01/01/16/Cgpw7Ft9Ke-ABfttAAE-aCG_yrY210.jpg"},
{"id":"74","title":"五十铃 Isuzu-TF185","link":"https://www.apaipian.com/play/2319_31968.html","url":"group1/M01/00/E1/CgptuFuMuOqAF5ZZAAGxawOXEJI858.jpg"},
{"id":"74","title":"大众 Volkswagen-Agricultor","link":"https://www.apaipian.com/play/2319_31970.html","url":"group1/M01/01/1B/CgpmTluMwwaADwprAAFFUe1DMPU145.jpg"},
{"id":"74","title":"福特 Ford-Ranger 挑战篇","link":"https://www.apaipian.com/play/2319_31973.html","url":"group1/M01/00/E0/CgpsbFuMvuuAXkvmAAGhWWz5vYY942.jpg"},
{"id":"74","title":"福特 Ford-F150 The Bravest","link":"https://www.apaipian.com/play/2319_31975.html","url":"group1/M01/00/E1/CgptuFuMupeAeLRWAAEF5_51N9o482.jpg"},
{"id":"74","title":"五十铃 Isuzu-D-MAX ","link":"https://www.apaipian.com/play/2319_31978.html","url":"group1/M01/01/1B/CgpmTluMv9-AahffAAHTVL5R42M454.jpg"},
{"id":"74","title":"福特 Ford-Ranger Quiroga","link":"https://www.apaipian.com/play/2319_31981.html","url":"group1/M01/01/1B/CgpmTluMvXaAaW4dAAFfoylZbj0272.jpg"},
{"id":"74","title":"五十铃 Isuzu-D-Max V-Cross","link":"https://www.apaipian.com/play/2319_31982.html","url":"group1/M01/00/E0/CgpsbFuMwNWAPvbUAAJ89H4EWwk585.jpg"},
{"id":"74","title":"福特 Ford-Ranger The Storm","link":"https://www.apaipian.com/play/2319_31983.html","url":"group1/M01/00/E0/CgpsbFuMvjqADu-qAAHoZmxHmxs128.jpg"},
{"id":"74","title":"大众 Volkswagen- V6 550","link":"https://www.apaipian.com/play/2319_31984.html","url":"group1/M01/01/1B/CgpmTluMwbeAWFMvAAF5_4JZJsQ142.jpg"},
{"id":"74","title":"福特 Ford-Ranger Acredita","link":"https://www.apaipian.com/play/2319_31985.html","url":"group1/M01/01/1B/CgpmTluMvNaAQ0eWAAOSYqZdNJ4593.jpg"},
{"id":"75","title":"福特 Ford-Ranger Facelift ","link":"https://www.apaipian.com/play/2319_32017.html","url":"group1/M01/00/E1/CgptuFuMxPCAe9YnAAHW0TlEOb8954.jpg"},
{"id":"75","title":"大众 Volkswagen-ultimate ","link":"https://www.apaipian.com/play/2319_32019.html","url":"group1/M01/01/1B/CgpmTluMxiKAWpgpAAGMA7hNsnc133.jpg"},
{"id":"75","title":"大众 Volkswagen- Full CG","link":"https://www.apaipian.com/play/2319_32022.html","url":"group1/M01/01/19/Cgpw7FuMxZOAeHK_AAGhI5BIsT8147.jpg"},
{"id":"75","title":"福特 Ford-4X4官方版","link":"https://www.apaipian.com/play/2319_32063.html","url":"group1/M01/01/19/Cgpw7FuN6xWAYRB1AAJPlCnN0_8562.jpg"},
{"id":"76","title":"江铃集团 JMCG","link":"https://www.apaipian.com/play/2319_31862.html","url":"group1/M01/00/DF/CgpsbFuI5k-AfDQhAAGpVsn1FZ8280.jpg"},
{"id":"76","title":"江淮格尔发-品质篇","link":"https://www.apaipian.com/play/2319_31905.html","url":"group1/M01/00/E0/CgpsbFuMfjGAG4mdAAFgOcBkhIc748.jpg"},
{"id":"76","title":"一汽解放青汽-50周年","link":"https://www.apaipian.com/play/2319_31956.html","url":"group1/M01/00/E0/CgpsbFuL8mWALvokAAH3XFBYs0w688.jpg"},
{"id":"76","title":"江淮汽车-上市篇","link":"https://www.apaipian.com/play/2319_32062.html","url":"group1/M01/01/1B/CgpmTluN6fWAD0DSAAFw5Pmt-cw166.jpg"},
{"id":"80","title":"戴姆勒 DAIMLER-惊艳篇","link":"https://www.apaipian.com/play/2319_24559.html","url":"group1/M01/01/18/CgpmTlt9J86AYcZdAAF05ATdEck794.jpg"},
{"id":"80","title":"Premier","link":"https://www.apaipian.com/play/2319_32024.html","url":"group1/M01/01/1B/CgpmTluMyBiAKk6TAAHlV-RYA2c747.jpg"},
{"id":"80","title":"Thaco-Master V3 ","link":"https://www.apaipian.com/play/2319_32060.html","url":"group1/M01/01/19/Cgpw7FuN6HWAWdU5AAIgFDpUHRo127.jpg"},
{"id":"80","title":"Midttrafik-Denmark","link":"https://www.apaipian.com/play/2319_32061.html","url":"group1/M01/01/19/Cgpw7FuN6VqAIBzPAAHPr2kNmaU650.jpg"},
{"id":"81","title":"一见钟情","link":"https://www.apaipian.com/play/2319_32058.html","url":"group1/M01/00/E0/CgpsbFuN5JaAV1UrAAGQJEem-Tk783.jpg"},
{"id":"81","title":"Bus 44","link":"https://www.apaipian.com/play/2319_32059.html","url":"group1/M01/01/1B/CgpmTluN5lKACeIQAAFDNFc_zp4717.jpg"},
{"id":"81","title":"夜间巴士","link":"https://www.apaipian.com/play/2319_32072.html","url":"group1/M01/01/19/Cgpw7FuN5xaAYliqAAH8dSxdfbs205.jpg"},
{"id":"81","title":"The Last Bus","link":"https://www.apaipian.com/play/2319_32073.html","url":"group1/M01/01/1B/CgpmTluN56yAbcZ7AAIBDs-WdVc028.jpg"},
{"id":"82","title":"Buses in Bangkok","link":"https://www.apaipian.com/play/2319_31993.html","url":"group1/M01/00/E0/CgpsbFuMy2-ACwOHAAHpHIlw5Cc719.jpg"},
{"id":"82","title":"Ministry of Transport","link":"https://www.apaipian.com/play/2319_31994.html","url":"group1/M01/00/E1/CgptuFuMzASACOr8AAEv51W7mjI419.jpg"},
{"id":"82","title":"Tips on Riding Bus","link":"https://www.apaipian.com/play/2319_31995.html","url":"group1/M01/00/E0/CgpsbFuMzMuACR6NAAGh9pnKzZo865.jpg"},
{"id":"82","title":"Vector Sample","link":"https://www.apaipian.com/play/2319_31996.html","url":"group1/M01/00/E0/CgpsbFuMzZKAd9tLAAFWkuRi2_E718.jpg"},
{"id":"82","title":"ATS-制造服务","link":"https://www.apaipian.com/play/2319_32025.html","url":"group1/M01/00/E1/CgptuFuMySqAcJYZAAE-4ZxwzJY978.jpg"},
{"id":"82","title":"宇通-文明就餐","link":"https://www.apaipian.com/play/2319_32026.html","url":"group1/M01/01/1B/CgpmTluMzlSAAvwRAAFT38Y1Zbk957.jpg"},
{"id":"82","title":"Bangkok university","link":"https://www.apaipian.com/play/2319_32028.html","url":"group1/M01/00/E0/CgpsbFuMyhuAJ1IIAAFUxVyPiJk037.jpg"},
{"id":"82","title":"Bus Overtaking","link":"https://www.apaipian.com/play/2319_32031.html","url":"group1/M01/01/1B/CgpmTluMyp-AM1DaAAGnN1OlGpc845.jpg"},
{"id":"83","title":"奔驰 Mercedes Benz-Coach","link":"https://www.apaipian.com/play/2319_31997.html","url":"group1/M01/00/E1/CgptuFuMz2iANwYTAAGEbEim2kw272.jpg"},
{"id":"83","title":"奔驰 Mercedes Benz-无人驾驶","link":"https://www.apaipian.com/play/2319_31998.html","url":"group1/M01/00/E0/CgpsbFuM6hSAeOChAAF7BYflcbQ738.jpg"},
{"id":"83","title":"曼恩 MAN-Lions Family","link":"https://www.apaipian.com/play/2319_31999.html","url":"group1/M01/00/E0/CgpsbFuM7XiAKlVAAAI2K6zjzBQ928.jpg"},
{"id":"83","title":"奔驰 Mercedes Benz-Bus","link":"https://www.apaipian.com/play/2319_32000.html","url":"group1/M01/00/E2/CgptuFuM7PyAbRsuAAEccvYjNDE341.jpg"},
{"id":"83","title":"奔驰 Mercedes Benz-2016篇","link":"https://www.apaipian.com/play/2319_32002.html","url":"group1/M01/00/E2/CgptuFuM6N6AC3ltAAGRZaSJh8Q573.jpg"},
{"id":"83","title":"曼恩 MAN-紧急刹车篇","link":"https://www.apaipian.com/play/2319_32004.html","url":"group1/M01/00/E2/CgptuFuM6-GAW1o-AAHCNm-G9Uw932.jpg"},
{"id":"83","title":"曼恩 MAN-Lion´s Intercity","link":"https://www.apaipian.com/play/2319_32006.html","url":"group1/M01/00/E2/CgptuFuM6qqAb1-wAAGqH9ZR0Qk320.jpg"},
{"id":"83","title":"奔驰 Mercedes Benz-2018篇","link":"https://www.apaipian.com/play/2319_32007.html","url":"group1/M01/00/E2/CgptuFuM6VaAGinIAAGVx68Ycjw842.jpg"},
{"id":"83","title":"奔驰 Mercedes Benz-Future Bus","link":"https://www.apaipian.com/play/2319_32010.html","url":"group1/M01/00/E0/CgpsbFuM5D2AR5uBAAFEBISzcKU355.jpg"},
{"id":"83","title":"曼恩 MAN-Lions Coach","link":"https://www.apaipian.com/play/2319_32015.html","url":"group1/M01/00/E2/CgptuFuM4meAPbF4AAHedG1AXJg640.jpg"},
{"id":"83","title":"塔塔 TATA-Hybrid bus","link":"https://www.apaipian.com/play/2319_32016.html","url":"group1/M01/00/E0/CgpsbFuM24aAVCQMAAH1nFtdU7U919.jpg"},
{"id":"83","title":"10 Future Trucks & Buses","link":"https://www.apaipian.com/play/2319_31894.html","url":"group1/M01/01/1A/CgpmTluJC9GAEYvpAAH61J5mMLk227.jpg"},
{"id":"84","title":"宇通校车-第三代校车功能片","link":"https://www.apaipian.com/play/2319_24185.html","url":"group1/M01/01/17/CgpmTlt6j8-AAeLDAAG8P3HxXmc730.jpg"},
{"id":"84","title":"申龙客车-2017篇","link":"https://www.apaipian.com/play/2319_32023.html","url":"group1/M01/01/19/Cgpw7FuM4U6Af0YmAAHAY2-k5aM140.jpg"},
{"id":"84","title":"金龙客车-龙威2代","link":"https://www.apaipian.com/play/2319_32030.html","url":"group1/M01/00/E0/CgpsbFuM3-CAYGzBAAI4nbmUqfM608.jpg"},
{"id":"84","title":"尼奥普兰 Neoplan-Jetliner","link":"https://www.apaipian.com/play/2319_32032.html","url":"group1/M01/00/E2/CgptuFuM4KGAWeTVAAF4RPxwsu0517.jpg"},
{"id":"85","title":"福田 Foton-欧辉安全须知","link":"https://www.apaipian.com/play/2319_32003.html","url":"group1/M01/01/1B/CgpmTluM2seAfPIuAAIUvVfC4zs561.jpg"},
{"id":"85","title":"曼恩 MAN-Pneumatic door","link":"https://www.apaipian.com/play/2319_32009.html","url":"group1/M01/01/1B/CgpmTluM3oKAMbP7AAFFWG6s6x0195.jpg"},
{"id":"85","title":"奔驰 Mercedes Benz-Citaro","link":"https://www.apaipian.com/play/2319_32013.html","url":"group1/M01/01/19/Cgpw7FuM3bGAHG7vAAIGg-bb9qY191.jpg"},
{"id":"85","title":"宇通客车-原理篇","link":"https://www.apaipian.com/play/2319_32033.html","url":"group1/M01/01/1B/CgpmTluM3ySAM10VAAFEfzdGjJA595.jpg"},
{"id":"86","title":"福田 Foton-2017欧辉年会","link":"https://www.apaipian.com/play/2319_32005.html","url":"group1/M01/01/1B/CgpmTluM1gqAVBRkAAGvvCmv55w085.jpg"},
{"id":"86","title":"金龙客车-2016版","link":"https://www.apaipian.com/play/2319_32011.html","url":"group1/M01/01/19/Cgpw7FuM1SGAUNpJAAF_CjOivmg532.jpg"},
{"id":"86","title":"福田 Foton-欧辉道展","link":"https://www.apaipian.com/play/2319_32018.html","url":"group1/M01/00/E0/CgpsbFuM2jGANcvLAAGN5x_2BNQ569.jpg"},
{"id":"86","title":"宇通客车-走向世界","link":"https://www.apaipian.com/play/2319_32020.html","url":"group1/M01/01/19/Cgpw7FuM2GKAGu0wAAJ2Qyewz8E521.jpg"},
{"id":"86","title":"宇通客车-自动化篇","link":"https://www.apaipian.com/play/2319_32021.html","url":"group1/M01/00/E2/CgptuFuM1x-AOxQFAAHjwty2CCE910.jpg"},
{"id":"86","title":"宇通客车-品质篇","link":"https://www.apaipian.com/play/2319_32027.html","url":"group1/M01/00/E0/CgpsbFuM1tiAWpFzAAHjJ2o_Jao405.jpg"},
{"id":"86","title":"曼恩 MAN-TeleMatics® Tutorial","link":"https://www.apaipian.com/play/2319_32029.html","url":"group1/M01/01/1B/CgpmTluM2VKASkWBAAGEb9neQ8A535.jpg"},
{"id":"86","title":"比亚迪 BYD-Renewable Energy","link":"https://www.apaipian.com/play/2319_32034.html","url":"group1/M01/01/1B/CgpmTluM182AR2sWAAIbEXQvACM097.jpg"},
];
$().ready(function() {
	 
	$('.setShare').click(function(){
		var title = '区块链宣传片制作_区块链项目路演视频_区块链是什么_区块链技术-拍片网';
		var url = 'https://www.apaipian.com/special/channel07.html';
		var img_path = 'https://www.apaipian.com//resources/images/salesman/special/banner01.jpg';
		share.init(url,title,img_path);
	});
		
	path = $('#imgPath').val();
	
	$('.findPage').off('click').on('click',function(){
		  var code = $(this).attr('data-id');
		  $('.pageMenu div').removeClass('activeMenu');
		  $(this).addClass('activeMenu');
		  getCodeShow();
	});
	
	$('.findPageTop').off('click').on('click',function(){
		  var code = $(this).attr('data-id');
		  var hasMore = false;
		  if($(this).hasClass('activeMenuMore')){
			  $(this).removeClass('activeMenuMore');
			  hasMore = true;
		  }
		  if(!hasMore){
			  if($(this).parent().parent().hasClass('topMenu')){
					  $('.allPage').removeClass('activeMenuMore');
					  $(this).addClass('activeMenuMore');
			  }
		  }
		  
		  var itemLength = $('.activeMenuMore').length;
		  if(itemLength == 0){
			  $('.allPage').addClass('activeMenuMore');
		  }
		  
		  getCodeShow();
		  
	});
	
	$('.allPage').off('click').on('click',function(){
		  var code = $(this).attr('data-id');
			  $('.findPageTop').removeClass('activeMenuMore');
			  $(this).addClass('activeMenuMore');
			  getCodeShow();
	});
	
	$('.typeUp').click(function(){
	    var now = $('.scrollDiv').scrollTop();
	    $('.scrollDiv').scrollTop(now - 30);
	});
	$('.typeDown').click(function(){
	    var now = $('.scrollDiv').scrollTop();
	    $('.scrollDiv').scrollTop(now + 30);
	});
	
	$('.typeUpTop').click(function(){
	    var now = $('.scrollDivTop').scrollLeft();
	    $('.scrollDivTop').scrollLeft(now - 125);
	});
	$('.typeDownTop').click(function(){
	    var now = $('.scrollDivTop').scrollLeft();
	    $('.scrollDivTop').scrollLeft(now + 125);
	});
	
	$(window).scroll(function(){
		var divHeight = $('.main_pd').height() + 56;
		var now = $(window).scrollTop();
		var check = $('.main_pd').offset().top;
		var bottom = $('.main_4').offset().top;
		var total = bottom - now;
		if(divHeight > 606){
				if(now > check){			  
					$('.pageMenu').css('top',now - check + 7);
					$('.pageMenu').show();
					$('.topMenu').css('top',now - check + 4);
					$('.topMenu').show();
				}else{
					$('.pageMenu').css('top',-17);
					$('.pageMenu').show();
					$('.topMenu').css('top',-20);
					$('.topMenu').show();
				}
				if(total < 500){
					//$('.pageMenu').hide();
					$('.pageMenu').css('top',divHeight - 375 - 73);
					$('.topMenu').css('top',divHeight - 375 - 73);
				}
		}else{
			 $('.pageMenu').css('top',-17);
			 $('.topMenu').css('top',-20);
		}
	});
	
	
	caseAll();

});

function getCodeShow(){
	 $('.channel').html('');
     one = $('.activeMenu').attr('data-id');
     two = $('.activeMenuMore').attr('data-id');
     twoArray = $('.activeMenuMore');
     
     if(one == '*' && two != '*'){
    	 caseOne(twoArray);  	 
     }
     if(two == '*' && one != '*'){
    	 caseTwo(one);  
     }
     if(one != '*' && two != '*'){
    	 caseThree(one,twoArray);
     }
     if(one == '*' && two == '*'){
    	 caseAll();
     }

}

function caseOne(item){
	var hasMore = false;
	if(item.length > 1){
		hasMore = true;
	}
		
	for (var int = 0; int < arrayItem.length; int++) {
		 var element = arrayItem[int];
		 var num = element.id;
		 var needNum = num.substr(1,1);
		 
		 if(hasMore){
			 for (var j = 0; j < item.length; j++) {
				var checkNum = $(item[j]).attr('data-id');
				if(needNum == checkNum){
					CreateHtml(element);
				}
				 
			}
		 }else{
			var checkNum = $(item).attr('data-id');
			if(needNum == checkNum){
				CreateHtml(element);
			}
		 }
	}
	
}

function caseTwo(item){
	
	for (var int = 0; int < arrayItem.length; int++) {
		 var element = arrayItem[int];
		 var num = element.id;
		 var needNum = num.substr(0,1);
		 if(needNum == item){
			 CreateHtml(element);
		 }
	
	}
}

function caseThree(id,item){
	
	var hasMore = false;
	if(item.length > 1){
		hasMore = true;
	}
	for (var int = 0; int < arrayItem.length; int++) {
		 var element = arrayItem[int];
		 var num = element.id;
		 var needNum = num;
		 
		 if(hasMore){
			 for (var j = 0; j < item.length; j++) {
				var checkNum = id + $(item[j]).attr('data-id');
				if(needNum == checkNum){
					CreateHtml(element);
				}
			}
		 }else{
			var checkNum = id + $(item).attr('data-id');
			if(needNum == checkNum){
				CreateHtml(element);
			}
		 }
	}

}

function caseAll(){
	
	for (var int = 0; int < arrayItem.length; int++) {
		 var element = arrayItem[int];
		 var num = element.id;
		 var needNum = num;
		 CreateHtml(element);
	}
	
}

function CreateHtml(item){

	    var formBody ='<li class="page">'
			formBody+='	<div class="kk">'
			formBody+='		<a href="'+item.link+'" target="_blank">'
			formBody+='			<span>'
			formBody+='				<img alt="'+item.title+'" src="'+path+''+item.url+'">'
			formBody+='				<i></i>'
			formBody+='			</span>'
			formBody+='			<font>'+item.title+'</font>'
			formBody+='		</a>'
			formBody+='	</div>'
			formBody+='</li>';
		
		$('.channel').append(formBody);
	
}








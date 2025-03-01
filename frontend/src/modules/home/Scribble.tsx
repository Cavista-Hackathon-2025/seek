import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useIsVisible } from "@/hooks/useIsVisible";

export const Scribble = () => {
    gsap.fromTo(
        ".path-animation",
        {
            strokeDasharray: "1000, 1000", // Ensure paths are hidden initially
            strokeDashoffset: 1000, // Fully offset the stroke
        },
        {
            strokeDasharray: "1000, 0", // Keep the same length for the stroke
            strokeDashoffset: 0, // Animate to fully reveal the stroke
            duration: 2,
            ease: "power2.out",
        }
    );
    return (
        <svg
            width="1749"
            height="837"
            viewBox="0 0 1749 837"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scribble-animation  -z-10"
        >
            <mask
                className="path-animation" id="mask0_2161_22702"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="917"
                y="645"
                width="289"
                height="80"
            >
                <path
                    className="path-animation" d="M921.291 724.76C927.801 722.98 934.33 721.321 940.859 719.7C983.196 709.243 1025.93 700.344 1068.76 692.159C1070.05 691.933 1073.8 691.196 1074.93 690.975L1076.17 690.666L1078.64 690.051C1117.72 680.239 1156.82 669.345 1194.46 654.919C1197.83 653.591 1201.51 652.127 1205.4 650.52L1204.16 645.194C1201.65 646.214 1199.31 647.14 1197.17 647.971C1167.67 659.241 1136.83 667.723 1106.1 674.98C1095.55 677.431 1083.75 680.036 1073.2 682.205C1068.11 683.024 1061.88 683.82 1057.05 684.558C1010.59 691.071 964.013 697.021 917.21 700.44L921.291 724.76Z"
                    fill="#735BF6"
                />
            </mask>
            <g mask="url(#mask0_2161_22702)">
                <path
                    className="path-animation" d="M912.727 714.793C982.215 705.048 1146.97 674.346 1207.93 646.742"
                    stroke="#735BF6"
                    strokeWidth="38.3382"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                />
            </g>
            {/*  className="path-animation" A className="path-animation" dd the remaining SVG content here */}
            <mask className="path-animation" id="mask1_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="945" y="2" width="662" height="750">
                <path className="path-animation" d="M947.021 751.559C993.73 745.804 1040.23 737.092 1084.88 722.021C1136.01 704.451 1189.06 678.222 1222.59 634.429C1230.98 623.233 1238.01 610.297 1241.61 596.611C1263.65 591.628 1285.36 583.93 1302.74 577.08C1339.21 562.389 1410.42 527.005 1423.94 488.47C1430.59 468.227 1416.53 454.814 1399.06 447.76C1396.41 446.626 1393.38 445.597 1390.64 444.682C1382.82 442.041 1375.07 438.713 1368.24 434.439C1359.46 428.862 1351.76 421.631 1349.53 411.589C1346.21 394.227 1360.34 378.8 1372.68 367.947C1401.55 343.556 1437.29 329.344 1471.91 315.072C1486.02 309.303 1500.47 304.324 1515.19 300.284C1522.65 298.104 1529.99 296.432 1537.48 294.041C1552.56 289.13 1566.86 280.952 1577.83 269.323C1633.38 210.011 1595 90.2594 1568.09 23.9766C1565.1 16.7871 1562.08 9.67834 1558.73 2.62305L1549.07 7.43421C1580.58 71.8192 1628.57 204.042 1572.48 264.24C1559.7 277.888 1542.36 285.851 1524.34 290.193C1517.38 291.961 1498.31 297.628 1491 299.715C1461.13 307.834 1431.69 318.217 1404.44 333.176C1381.21 346.007 1354.42 363.353 1342.54 388.071C1331.89 411.008 1342.45 430.844 1362.82 443.149C1371.48 448.485 1380.64 452.114 1390.12 455.16C1391.85 455.749 1393.55 456.377 1395.22 457.059C1407.53 462.072 1419.64 470.637 1414.7 485.504C1405.47 511.755 1364.77 536.93 1340.91 550.334C1310.09 566.927 1277.33 581.276 1243.15 589.467C1244.42 581.933 1244.59 574.227 1243.3 566.511C1239.31 541.803 1222.65 528.686 1197.76 534.51C1179.9 538.749 1157.08 554.254 1154.03 573.464C1152.05 588.08 1165.37 596.676 1177.89 599.671C1178.54 599.818 1179.2 599.958 1179.87 600.088L1179.09 593.583L1179.09 593.579C1175.77 592.68 1172.55 591.457 1169.49 589.82C1159 583.989 1157.73 574.784 1164.07 564.97C1172.07 553.074 1185.46 544.788 1199.36 541.596C1213.97 538.374 1226.88 542.877 1232.12 557.597C1235.74 567.565 1235.9 578.186 1233.75 588.419C1233.52 589.523 1233.26 590.625 1232.96 591.712C1232.34 594.122 1231.59 596.496 1230.74 598.829L1230.73 598.832C1230.7 598.922 1230.67 598.992 1230.65 599.055C1230.6 599.188 1230.57 599.261 1230.57 599.261C1229.27 602.74 1227.73 606.115 1225.99 609.351C1190.72 672.372 1102.5 700.935 1034.93 711.18C1005.23 715.639 975.148 717.533 945.117 717.083L947.021 751.559Z" fill="#FF9ECB" />
            </mask>
            <g mask="url(#mask1_2161_22702)">
                <path className="path-animation" d="M938.427 738.658C1050.64 725.689 1274.63 671.223 1233.99 552.78C1218.61 507.931 1118.9 575.475 1183.2 599.249M1238.32 594.386C1292.71 583.219 1400.96 543.594 1420.95 474.971C1404.2 430.122 1345.85 464.704 1344.22 397.161C1358.27 330.699 1541.45 298.819 1571.17 272.342C1596.57 242.083 1633.85 206.42 1553.34 -0.530273" stroke="#FFB8D9" strokeWidth="43.2275"
                    strokeDasharray="800"
                    strokeDashoffset="300" />
            </g>
            <mask className="path-animation" id="mask2_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="84" y="401" width="158" height="128">
                <path className="path-animation" d="M84.9321 401.979C84.9321 401.979 88.4853 423.232 88.9976 426.81C145.666 427.272 195.997 487.42 225.546 528.232C229.959 519.274 238.66 521.307 241.866 522.423C172.389 398.17 104.582 398.913 84.9321 401.979Z" fill="#FFB8D9" />
            </mask>
            <g mask="url(#mask2_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M79.4521 415C100.285 406.667 175.952 424 236.952 528" stroke="#FFB8D9" strokeWidth="50" />
            </g>
            <mask className="path-animation" id="mask3_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="225" y="521" width="201" height="151">
                <path className="path-animation" d="M225.546 528.232C232.685 538.09 238.61 546.816 243.122 553.302C246.989 558.863 250.658 564.557 254.178 570.341C266.548 590.676 315.714 671.887 388.19 671.887C435.951 671.887 425.911 628.976 421.234 614.664H421.226C417.367 613.392 413.558 612.02 409.79 610.558C440.769 702.212 306.889 659.087 262.35 562.772C255.533 548.039 248.691 534.627 241.866 522.423C238.66 521.307 229.959 519.274 225.546 528.232Z" fill="#735BF6" />
            </mask>
            <g mask="url(#mask3_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M226.452 512C247.452 558.333 311.952 662.6 377.952 667C433.452 667 418.452 619.5 416.452 605.5" stroke="#735BF6" strokeWidth="50" />
            </g>
            <mask className="path-animation" id="mask4_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="405" y="535" width="105" height="46">
                <path className="path-animation" d="M405.642 560.731C408.369 568.936 416.549 567.035 420.45 565.581C422.912 562.458 426.399 560.053 431.241 558.822C463.468 550.617 496.396 573.142 506.395 580.794C508.394 580.529 509.452 580.331 509.452 580.331V552.914C465.666 527.422 418.177 530.38 405.642 560.731Z" fill="#FBC333" />
            </mask>
            <g mask="url(#mask4_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M408.452 570C413.619 553.667 456.452 526.5 520.452 570" stroke="#FBC333" strokeWidth="50" />
            </g>
            <mask className="path-animation" id="mask5_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="403" y="560" width="18" height="14">
                <path className="path-animation" d="M403.073 569.977C407.618 571.398 412.08 572.663 416.443 573.786C417.277 570.762 418.566 567.961 420.45 565.581C416.55 567.035 408.369 568.936 405.643 560.731C404.461 563.573 403.593 566.655 403.073 569.977Z" fill="#FEEFC8" />
            </mask>
            <g mask="url(#mask5_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M407.952 577L412.952 562.5" stroke="#FEEFC8" strokeWidth="50" />
            </g>
            <mask className="path-animation" id="mask6_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="61" y="299" width="343" height="246">
                <path className="path-animation" d="M61.4406 310.002C90.4689 319.24 126.273 338.791 166.895 377.512C197.692 406.871 242.33 483.644 307.848 544.254C304.774 528.967 328.217 533.991 328.762 534.107C296.866 512.59 264.409 481.743 234.785 437.692C239.38 443.939 288.198 507.376 394.586 524.431C382.696 497.832 395.52 479.727 403.279 471.91C360.79 480.372 311.814 477.926 268.813 444.658C192.156 385.345 141.75 320.521 69.0923 299.772C65.9441 300.764 59.3005 303.639 61.4406 310.002Z" fill="#A1E8DF" />
            </mask>
            <g mask="url(#mask6_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M57.9521 301C84.7855 310.333 160.452 349.1 224.452 421.5C288.452 493.9 390.952 501 419.452 496M217.452 413.5C229.952 442.833 282.952 518.5 326.952 547" stroke="#A1E8DF" strokeWidth="55" />
            </g>
            <mask className="path-animation" id="mask7_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="307" y="533" width="103" height="78">
                <path className="path-animation" d="M307.847 544.254C337.372 571.589 371.135 595.626 409.79 610.558C409.327 609.194 408.823 607.789 408.286 606.36C402.923 592.089 401.469 579.951 403.072 569.977C379.861 562.739 354.501 551.459 328.77 534.107H328.762C328.216 533.991 304.774 528.967 307.847 544.254Z" fill="#86CEEC" />
            </mask>
            <g mask="url(#mask7_2161_22702)">
                <path className="path-animation" d="M297.952 524C314.952 538.5 385.252 586.9 418.452 596.5" stroke="#86CEEC" strokeWidth="50" />
            </g>
            <mask className="path-animation" id="mask8_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="415" y="573" width="95" height="54">
                <path className="path-animation" d="M419.574 610.078C419.574 610.078 420.293 611.797 421.226 614.664H421.235C448.272 623.613 477.606 628.051 509.452 626.142V583.248C509.452 583.248 508.37 582.314 506.395 580.794C496.182 582.149 461.369 585.347 416.442 573.786C412.187 589.131 419.574 610.078 419.574 610.078Z" fill="#86CEEC" />
            </mask>
            <g mask="url(#mask8_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M402.452 590.5C415.952 595.167 484.452 607.6 526.452 606" stroke="#86CEEC" strokeWidth="50" />
            </g>
            <mask className="path-animation" id="mask9_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="402" y="569" width="20" height="46">
                <path className="path-animation" d="M408.286 606.36C408.824 607.789 409.328 609.194 409.79 610.557C413.558 612.02 417.368 613.392 421.227 614.664C420.293 611.797 419.574 610.078 419.574 610.078C419.574 610.078 412.187 589.131 416.442 573.786C412.079 572.663 407.617 571.398 403.072 569.977C401.469 579.951 402.924 592.089 408.286 606.36Z" fill="#68DACB" />
            </mask>
            <g mask="url(#mask9_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M396.952 589.5L426.452 596.5" stroke="#68DACB" strokeWidth="50" />
            </g>
            <mask className="path-animation" id="mask10_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-15" y="293" width="85" height="18">
                <path className="path-animation" d="M-14.5479 295.838L-3.64045 299.284L2.49075 302.135L4.23435 303.25C17.8934 301.78 37.3283 302.333 61.4402 310.001C59.3 303.639 65.9436 300.763 69.0919 299.772C44.4181 292.731 17.1662 290.773 -14.5479 295.838Z" fill="#A1E8DF" />
            </mask>
            <g mask="url(#mask10_2161_22702)">
                <path className="path-animation" d="M-15.0479 300.5C-3.8812 297.667 43.7521 296.1 70.9521 306.5" stroke="#A1E8DF" strokeWidth="40" />
            </g>
            <mask className="path-animation" id="mask11_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="1170" y="352" width="180" height="267">
                <path className="path-animation" d="M1310.1 612.978L1311.03 618.871C1328.13 608.06 1342.64 594.879 1347.54 579.298C1353.63 560.148 1341.91 542.549 1327.73 530.729C1319.45 523.718 1309.91 518.292 1299.77 514.487C1296.93 513.408 1292.83 511.862 1290.04 510.742C1255.66 496.779 1220.62 477.718 1197.16 448.343C1173.2 417.198 1179.17 389.715 1213.8 370.966C1221.22 367.006 1229.14 364.108 1237.25 361.86C1235.61 360.343 1233.99 358.615 1233.29 357.207L1224.75 352.083C1222.39 352.874 1220.05 353.73 1217.73 354.656C1188.47 366.355 1162.66 391.84 1172.48 425.743C1186.2 470.843 1246.65 500.667 1287.73 516.643C1294.05 519.107 1300.87 521.252 1306.93 524.316C1322.7 532.273 1341.12 547.318 1343.3 565.829C1345.12 584.396 1329.48 600.375 1310.1 612.978Z" fill="#FBC333" />
            </mask>
            <g mask="url(#mask11_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M1310.95 616.5C1336.29 602 1373.15 563.7 1317.95 526.5C1248.45 494.999 1147.45 445.999 1180.95 390.499C1204.15 370.099 1233.12 354.333 1239.95 351.5" stroke="#FBC333" strokeWidth="40" />
            </g>
            <mask className="path-animation" id="mask12_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="1431" y="78" width="216" height="225">
                <path className="path-animation" d="M1502.09 289.938C1478.68 292.949 1455.14 294.869 1431.56 295.919L1439.15 302.17C1453.46 301.309 1467.78 300.176 1482.08 298.609C1504.68 296.185 1527.19 292.805 1549.47 288.249C1558.08 286.505 1566.69 284.598 1575.13 282.064C1659.41 256.489 1658.96 185.576 1627.03 116.151C1621.48 104.123 1615.23 92.4132 1608.18 81.2016C1607.69 80.4405 1607.23 79.7132 1606.69 78.9155L1599.73 83.7287C1603.59 89.3382 1607.2 95.1886 1610.58 101.112C1624.01 124.919 1634.97 150.656 1639.04 177.789C1645.77 223.73 1626.56 256.698 1583.04 272.918C1571.81 277.259 1560.05 279.894 1548.25 282.285C1533.02 285.428 1517.51 287.931 1502.09 289.938Z" fill="#FF6600" />
            </mask>
            <g mask="url(#mask12_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M1430.34 301.216C1537.49 298.226 1716.4 272.311 1604.76 77.4517" stroke="#FF6600" strokeWidth="39.8686" />
            </g>
            <mask className="path-animation" id="mask13_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="1425" y="277" width="119" height="25">
                <path className="path-animation" d="M1425.41 299.568C1426.59 300.14 1428.26 300.915 1429.83 301.488C1430.77 300.631 1431.73 299.809 1432.71 299.01C1453.55 282.113 1482.96 280.061 1508.62 282.606C1517.01 283.437 1525.33 284.712 1533.64 286.138L1543.62 283.279C1527.86 280.421 1512.07 277.714 1496.03 277.309C1470.93 276.676 1443.91 281.644 1425.41 299.568Z" fill="#68DACB" />
            </mask>
            <g mask="url(#mask13_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M1427.95 301.5C1438.45 285.5 1481.95 269.9 1543.95 285.5" stroke="#68DACB" strokeWidth="40" />
            </g>
            <mask className="path-animation" id="mask14_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="1549" y="249" width="97" height="46">
                <path className="path-animation" d="M1558.65 285.975L1549.4 288.942C1563.62 291.488 1577.85 293.914 1592.29 294.701C1605.23 295.406 1619.27 295.079 1630.86 288.529C1636.16 285.529 1640.6 281.288 1643.11 275.665C1645.7 269.859 1646.02 262.88 1641.88 257.705C1638.78 253.829 1634.33 251.779 1629.82 249.843C1628.88 250.977 1627.59 252.466 1626.68 253.492C1631.28 255.459 1637.13 257.484 1639.51 262.255C1642.23 267.712 1639.49 274.532 1635.86 278.875C1632.01 283.482 1626.24 286.275 1620.59 287.965C1607.54 291.875 1593.28 290.648 1579.94 289.128C1572.82 288.317 1565.73 287.201 1558.65 285.975Z" fill="#68DACB" />
            </mask>
            <g mask="url(#mask14_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M1551.45 286.5C1578.95 292.667 1636.45 299.5 1642.45 271.5C1645.45 257.5 1634.45 255.5 1625.45 249.124" stroke="#68DACB" strokeWidth="40" />
            </g>
            <mask id="mask15_2161_22702" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="1608" y="190" width="99" height="61">
                <path className="path-animation" d="M1615.07 219.91C1617.99 214.111 1623.05 209.54 1628.38 205.985C1638.84 199.022 1651.57 196.371 1663.94 195.538C1677.22 194.645 1690.57 195.836 1703.78 197.181C1706.66 197.47 1707.09 192.995 1704.21 192.703C1700.94 192.374 1697.67 192.054 1694.4 191.774C1669.23 189.638 1639.58 189.073 1619.56 207.139C1614.6 211.626 1610.42 217.291 1608.83 223.882C1607.32 230.153 1608.19 236.954 1611.59 242.479C1613.75 245.987 1616.79 248.416 1620.2 250.363C1621.62 249.102 1622.63 247.918 1623.34 246.901C1619.51 244.896 1616.16 242.31 1614.23 237.888C1611.7 232.07 1612.24 225.509 1615.07 219.91Z" fill="#68DACB" />
            </mask>
            <g mask="url(#mask15_2161_22702)">
                <path strokeDasharray="300"
                    strokeDashoffset="300" className="path-animation" d="M1705.45 195C1682.95 192 1642.45 187 1614.45 216C1605.32 240.597 1614.58 245.518 1624.95 248.959" stroke="#6 8DACB" strokeWidth="40" />
            </g>
            <path strokeDasharray="300"
                strokeDashoffset="300" className="path-animation" d="M891.99 595.755L888.857 598.263C886.478 600.177 885.26 603.164 885.595 606.18L886.044 610.167L883.536 607.035C881.623 604.657 878.635 603.439 875.621 603.773L871.631 604.222L874.765 601.714C877.143 599.8 878.359 596.813 878.026 593.797L877.578 589.81L880.086 592.942C881.999 595.32 884.986 596.538 888.001 596.204L891.99 595.755Z" fill="#FAEFCB" />
            <path strokeDasharray="300"
                strokeDashoffset="300" className="path-animation" d="M555.272 714.785L551.423 717.867C548.502 720.218 547.005 723.887 547.417 727.592L547.968 732.49L544.887 728.643C542.537 725.722 538.867 724.225 535.164 724.635L530.263 725.187L534.113 722.106C537.034 719.755 538.527 716.086 538.119 712.381L537.568 707.483L540.649 711.33C542.999 714.251 546.669 715.747 550.372 715.338L555.272 714.785Z" fill="#FAEFCB" />
        </svg>
    );
};


export const Scribble2 = () => {
    

    return (
        <div  className="absolute h-fit top-96 left-0 right-0">
            <svg width="1570" height="399" viewBox="0 0 1770 399" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path  d="M10 267.83C53.4611 237.57 104.452 189.584 157.731 178.66C219.851 165.924 270.63 211.813 323.563 235.984C395.584 268.871 465.046 181.73 515.088 141.658C538.564 122.861 587.282 136.622 609.977 140.445C706.557 156.715 802.387 180.315 895.804 210.507C968.386 233.965 1030.35 208.07 1098.42 177.447C1169.67 145.394 1247.03 177.5 1317.39 197.768C1344.89 205.692 1368.46 212.198 1395.64 199.285C1422.95 186.301 1443.4 157.428 1473.88 151.364C1546.59 136.9 1619.17 202.138 1678.25 235.681C1707.95 252.539 1727.32 264.457 1760 256.911" stroke="#6D53E7" strokeWidth="262" strokeLinecap="round" />
            </svg>
        </div>
    );
}

export const Scribble3 = ({ isVisible }: { isVisible: boolean }) => {
    const svgRef = useRef(null);
    gsap.fromTo(
        ".path-animation",
        {
            strokeDasharray: "1000, 1000", // Hide the stroke initially
            strokeDashoffset: 1000, // Fully offset the stroke
        },
        {
            strokeDasharray: "100, 0", // Maintain stroke length
            strokeDashoffset: 0, // Animate to reveal the stroke
            duration: 2,
            ease: "power2.out", // Smooth easing
            scrollTrigger: {
                trigger: svgRef.current, // Trigger animation when SVG is in view
                start: "top 100%", // Start when top of SVG is 80% in viewport
                toggleActions: "play none none none", // Play only once
            },
        }
    );

    return (
        <div ref={svgRef} className="absolute bottom-0 h-[225px] w-[324px] ">
            <svg className="scribble-animation " width="497" height="334" viewBox="0 0 497 334" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2187_24106" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="48" y="6" width="343" height="246">
                    <path className={`${isVisible && "path-animation"}`} d="M48.4406 17.0013C77.4689 26.2395 113.273 45.7901 153.895 84.5112C184.692 113.871 229.33 190.644 294.848 251.254C291.774 235.967 315.217 240.991 315.762 241.107C283.866 219.59 251.409 188.743 221.785 144.692C226.38 150.939 275.198 214.376 381.586 231.431C369.696 204.832 382.52 186.727 390.279 178.91C347.79 187.372 298.814 184.926 255.813 151.658C179.156 92.3447 128.75 27.5203 56.0923 6.77148C52.9441 7.76306 46.3005 10.6386 48.4406 17.0013Z" fill="#A1E8DF" />
                </mask>
                <g mask="url(#mask0_2187_24106)">
                    <path className={`${isVisible && "path-animation"}`} strokeDasharray="1500"
                        strokeDashoffset="1500" d="M44.9521 8C71.7855 17.3333 147.452 56.1 211.452 128.5C275.452 200.9 377.952 208 406.452 203M204.452 120.5C216.952 149.833 269.952 225.5 313.952 254" stroke="#A1E8DF" stroke-width="55" />
                </g>
                <mask id="mask1_2187_24106" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="294" y="240" width="103" height="78">
                    <path className={`${isVisible && "path-animation"}`}  d="M294.847 251.254C324.372 278.589 358.135 302.626 396.79 317.558C396.327 316.194 395.823 314.789 395.286 313.36C389.923 299.089 388.469 286.951 390.072 276.977C366.861 269.739 341.501 258.459 315.77 241.107H315.762C315.216 240.991 291.774 235.967 294.847 251.254Z" fill="#86CEEC" />
                </mask>
                <g mask="url(#mask1_2187_24106)">
                    <path className={`${isVisible && "path-animation"}`} strokeDasharray="1500"
                        strokeDashoffset="1500" d="M284.952 231C301.952 245.5 372.252 293.9 405.452 303.5" stroke="#86CEEC" stroke-width="50" />
                </g>
                <mask id="mask2_2187_24106" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="402" y="280" width="95" height="54">
                    <path className={`${isVisible && "path-animation"}`}  d="M406.574 317.078C406.574 317.078 407.293 318.797 408.226 321.664H408.235C435.272 330.613 464.606 335.051 496.452 333.142V290.248C496.452 290.248 495.37 289.314 493.395 287.794C483.182 289.149 448.369 292.347 403.442 280.786C399.187 296.131 406.574 317.078 406.574 317.078Z" fill="#86CEEC" />
                </mask>
                <g mask="url(#mask2_2187_24106)">
                    <path className={`${isVisible && "path-animation"}`} strokeDasharray="1500"
                        strokeDashoffset="1500" d="M389.452 297.5C402.952 302.167 471.452 314.6 513.452 313" stroke="#86CEEC" stroke-width="50" />
                </g>
                <mask id="mask3_2187_24106" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="389" y="276" width="20" height="46">
                    <path className={`${isVisible && "path-animation"}`}  d="M395.286 313.36C395.824 314.789 396.328 316.194 396.79 317.557C400.558 319.02 404.368 320.392 408.227 321.664C407.293 318.797 406.574 317.078 406.574 317.078C406.574 317.078 399.187 296.131 403.442 280.786C399.079 279.663 394.617 278.398 390.072 276.977C388.469 286.951 389.924 299.089 395.286 313.36Z" fill="#68DACB" />
                </mask>
                <g mask="url(#mask3_2187_24106)">
                    <path className={`${isVisible && "path-animation"}`} strokeDasharray="1500"
                        strokeDashoffset="1500" d="M383.952 296.5L413.452 303.5" stroke="#68DACB" stroke-width="50" />
                </g>
                <mask id="mask4_2187_24106" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-28" y="0" width="85" height="18">
                    <path className={`${isVisible && "path-animation"}`}  d="M-27.5479 2.83836L-16.6404 6.28409L-10.5092 9.13488L-8.76565 10.2504C4.89335 8.77957 24.3283 9.3332 48.4402 17.0014C46.3 10.6388 52.9436 7.7632 56.0919 6.77162C31.4181 -0.268585 4.16615 -2.22696 -27.5479 2.83836Z" fill="#A1E8DF" />
                </mask>
                <g mask="url(#mask4_2187_24106)">
                    <path className={`${isVisible && "path-animation"}`} strokeDasharray="1500"
                        strokeDashoffset="1500" d="M-28.0479 7.50037C-16.8812 4.66703 30.7521 3.10037 57.9521 13.5004" stroke="#A1E8DF" stroke-width="40" />
                </g>
            </svg>

        </div>
    );
}
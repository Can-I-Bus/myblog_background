export function searchTree(nodes, searchKey, param) {
    for (let _i = 0; _i < nodes.length; _i++) {
        if (nodes[_i][param] === searchKey) {
            return nodes[_i];
        } else {
            if (nodes[_i].children && nodes[_i].children.length > 0) {
                let res = searchTree(nodes[_i].children, searchKey, param);
                if (res) {
                    return res;
                }
            }
        }
    }
    return null;
}

export function formatTimestamp(tiamestamp, formatStr = 'YYYY-MM-DD HH:mm:ss') {
    const date = new Date(tiamestamp);
    const dateMap = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
    };
    return formatStr.replace(/YYYY|MM|DD|HH|mm|ss/g, (item) => {
        return String(dateMap[item])?.[1] ? String(dateMap[item]) : `0${dateMap[item]}`;
    });
}

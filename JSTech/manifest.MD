* Manifest 有个坑爹的地方:

 用charles延迟manifest文件的请求然后改变当前页面的url（携程H5），                                    url切换之后再加载manifest，这个时候manifest会缓存切换之后的url。 -时序问题。

* 可以尝试使用iframe加载manifest。

```javascript       
 ;(function () {
        //如果不支持application cache，就不执行了
        if (!window.applicationCache || /fat|localhost|10.211.55.3|uat/ig.test(window.location.href)) { return;}

        var ifm = document.createElement("iframe");
        ifm.setAttribute("width", "0");
        ifm.setAttribute("height", "0");
        ifm.setAttribute("src", "/webapp/tuan/manifest");
        function removeEvent() {
        function remove() {
        ifm.removeEventListener("DOMNodeRemoved", includeManifest);
        ifm.removeEventListener("DOMNodeRemovedFromDocument", includeManifest);
        }
        var ifmAppCache = ifm.contentWindow.applicationCache
        ifmAppCache && ifmAppCache.addEventListener("cached", remove);
        ifmAppCache && ifmAppCache.addEventListener("updateready", remove);
        }

        function includeManifest() {
        var body = document.body || document.querySelector("body");
        body.appendChild(ifm);
        }

        ifm.addEventListener("load", removeEvent);
        ifm.addEventListener("DOMNodeRemoved", includeManifest);
        ifm.addEventListener("DOMNodeRemovedFromDocument", includeManifest);

        includeManifest();

        })();

```

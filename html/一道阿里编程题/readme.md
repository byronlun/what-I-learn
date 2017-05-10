# DocumentFragment

在所有节点类型中，只有DocumentFragment在文档中没有对应的标记。DOM规定文档片段（documentfragment）是一种”轻量级“的文档，可以包含和控制节点，但不会像完整的文档那样占用额外资源。DocumentFragment节点具有下列特征：

- nodeType的值为11
- nodeName的值为“#document-fragment”
- nodeValue的值为null
- parentNode的值为null
- 子节点可以是Element、ProcessingInstruction、Comment、Text、CDATASection或EntityReference

文档片段继承了Node的所有方法，通常用于执行那些针对文档的DOM操作。如果将文档中的节点添加到文档片段中，就会从文档树中再看到该节点。##添加到文档片段中的新节点同样也不属于文档树##。可以通过appendChild()或insertBefore()将文档片段中内容添加到文档中。在将文档片段作为参数传递给这两个方法时，实际上只会将文档片段的所有子节点添加到相应的位置上；文档片段本身永远不会成为文档树的一部分。

使用 `DocumentFragment` 最直接的目的就是节省DOM操作次数，通过文档片段暂存，然后一次性插入到文档树中。

```js
const ul = document.querySelector('ul')
const frag = document.createDocumentFragment()
for(let x = 0; x < 10; x++) {
	const li = document.createElement("li")
	li.innerHTML = "List item " + x
	frag.appendChild(li)
}
ul.appemdChild(frag)
```

##在阿里的这道编程题里，我发现了一个很多人会忽略的问题，如果我们把文档树已有的元素节点添加到 `DocumentFragment` 新建的文档片段中，这个元素也会立即从文档树中移除##。
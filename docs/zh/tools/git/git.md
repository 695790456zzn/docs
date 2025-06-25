# Git
[Git常用命令](https://www.runoob.com/note/56524)
## git config
我们可以通过git config来配置用户名和邮箱地址，便于我们将代码提交到远程仓库，具体格式如下
```js
git config --global user.name '你的用户名'
git config --global user.email '你的邮箱'
```

## git add
git add 命令可将文件添加到缓存
```js
git add .
```
当然我们也可以指定某一类文件，如将java文件添加到缓存中
```js
it add *.java
```

## git status
我们可以使用 git status 命令来查看相关文件的状态
```js
git status
```

## git diff
  执行 git diff 来查看更新的详细信息，与git status不同的是，git status只显示更新的状态，而 git diff 可以显示已写入缓存与已修改但尚未写入缓存的改动的区别具体的详细信息。

- 尚未缓存的改动：git diff
- 查看已缓存的改动： git diff --cached
- 查看已缓存的与未缓存的所有改动：git diff HEAD
- 显示摘要而非整个 diff：git diff --stat

## git commit
git commit 将缓存区内容添加到仓库中，可以在后面加-m选项，以在命令行中提供提交注释
```js
git commit -m "第一次版本提交"
```
如果你觉得 每次 commit之前要add一下，想跳过add这一步，可以直接使用 -a选项
```js
git commit -am "第一次版本提交"
```

## git reset HEAD
git reset HEAD 命令用于取消已缓存的内容，如我们要取消已提交的test.txt文件
```js
git reset HEAD test.txt
```
执行完之后，再使用commit提交时，test.txt文件不会被提交。

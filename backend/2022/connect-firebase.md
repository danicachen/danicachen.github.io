---
title: firebase的配置方法
date: 2022/01/20
tags:
 - Vue
 - 部署
categories:
 - backend
---
::: tip 参考资料：
1. [Vue 3 and Firebase - Build and deploy a CRUD Application with Vue.js and Firebase](https://youtu.be/Htt8AKeF1Kw?t=193)
2. [初始化 Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart#initialize)
::: 

## 步骤：
1. 用npm安装firebase
```
npm install firebase@9.4.1 --save
```

2. 在`/src`文件夹下新建`firebase/firebaseinit.js`配置文件，导入firebase
```
import { initializeApp } from "firebase/app";  
import { getFirestore } from "firebase/firestore";
```

3. 初始化 `Cloud Firestore` 的实例：
``` 
const firebaseApp = initializeApp({ 
	apiKey: '### FIREBASE API KEY ###', 
	authDomain: '### FIREBASE AUTH DOMAIN ###', 
	projectId: '### CLOUD FIRESTORE PROJECT ID ###'  
});  
  
const db = getFirestore();

```

4. 导出db
```
export default db
```

5. 打开需要使用的组件文件，例如根组件`App.vue`，导入相关模块
```
import db from "./firebase/firebaseinit"
import { collection, getDocs } from "firebase/firestore";

```

6. 用`getDocs(collection(db, "集合名"));`查询集合`collection`
```  
const querySnapshot = await getDocs(collection(db, "users"));  
querySnapshot.forEach((doc) => { 
	console.log(`${doc.id} => ${doc.data()}`);  
});
```
7. 增加文档（不指定id的情况下，firestore会自动添加）
```
// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "集合名"), {
  name: "Tokyo",//示例字段：‘值’
  country: "Japan"//示例字段：‘值’
});
console.log("Document written with ID: ", docRef.id);
```
8. 修改文档
```
const newData = doc(db, "集合名", "文档id");
await updateDoc(newData, {
  fieldName:value,
});

```
9.  删除文档
```
import { doc, deleteDoc } from "firebase/firestore";

await deleteDoc(doc(db, "集合名", "文档名"));
```

成功获取到数据
![output](/img/firebase-output.jpg)

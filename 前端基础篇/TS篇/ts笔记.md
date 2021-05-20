# 前端学习之TS篇

## 1、TS的类型声明

#### 语法：

```typescript
//变量类型声明
let a: string = 'ts'
//函数参数类型声明
function sum (a: number,b: number){
    return a + b
}
//函数结果类型声明
function mul (a: number,b: number): number{
    return a * b
}
```

### 自动类型判断

* TS拥有自动的类型判断机制
* 当对变量的声明和赋值时同时进行的，TS编译器会自动判断变量的类型

### TS类型

| 类型    | 例子              | 描述                           |
| ------- | ----------------- | ------------------------------ |
| number  | 1，-2，3.55       | 任意数字                       |
| string  | ‘’‘TS’            | 任意字符串                     |
| boolean | true、false       | 布尔值true或false              |
| 字面量  | 其本身            | 限制变量的值就是该字面量的值   |
| any     | *                 | 任意类型                       |
| unknown | *                 | 类型安全的any                  |
| void    | 空值（undefined） | 没有值或者undefined            |
| never   | 没有值            | 不能是任何值                   |
| object  | {name:   'TS'}    | 任意的js对象                   |
| array   | [1,2,3]           | 任意js数组                     |
| tuple   | [4,5]             | 元祖，TS新增类型，固定长度数组 |
| enum    | enum[A,B]         | 枚举，TS中新增的类型           |


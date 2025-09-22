---
title: "这还是我认识的Java吗？一些Java的现代特性"
description: ""
date: 2025-09-22 00:00:00
updated: 2025-09-2 00:00:00
type: story
categories: [Java]
tags: []
---

## 开头

```java
void main(){
    var a = IO.readln();
    IO.println(a);
}
```

Java 25正式支持了无须类声明的极简入口```void main(){}```，此前为预览特性

Java 25简化了IO操作```IO.println()```和```IO.readln()```... IO类在java.lang里，所以无须导入

Java 10引入了var声明变量，自动推断类型，仅限局部变量

## 静态导入

```java
// 不用静态导入 注: 不需要手动导入Math，因为 java.lang.* 默认导入
void main() {
    double x = Math.sqrt(4);
    double p = Math.PI;
}

// 静态导入
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;
// import static java.lang.Math.*; // 一键静态导入
void main() {
    double x = sqrt(4); // 不用Math.了
    double p = PI;
}
```

静态导入适合频繁使用的工具方法（如 Math.*, Assertions.*, Collectors.*），但不要滥用，否则会降低代码可读性（别人不知道这个方法是哪来的）。

这个Java 5就有了，但是我才知道

## 自动解构 条件守卫 箭头语法

```java
import static java.lang.Math.*;

record Point(int x, int y) { }

void main() {
    IO.println("生成一个随机点：");
    var p = new Point(
            (int)(random() * 100),
            (int)(random() * 100)
    );

    switch (p) {
        case Point(int x, int y) when x > 50 && y > 50 ->
                IO.println("↗在右上角");
        case Point(int x, int y) ->
                IO.println("坐标: (" + x + ", " + y + ")");
    }
}
```

- ```case Point(int x, int y)``` 自动解构 record，绑定变量 x, y，可以随便命名
- when：只有满足 ```x > 50 && y > 50``` 才匹配该分支
- 箭头语法（->）：避免 break，可返回值

## instanceof

以前
```java
if (obj instanceof String) {
    String s = (String) obj; // 还得强转
    IO.println(s.toUpperCase());
}
```

现在
```java
if (obj instanceof String s) { // 直接绑定变量
    IO.println(s.toUpperCase()); // s 已经是 String 类型
}
// 变量作用域：if (obj instanceof String s) 中的 s，只在 if 块内有效。出了 if 就不能用了，避免变量污染。

// 还能写switch里
switch (obj) {
    case String s -> IO.println("字符串: " + s);
    case Integer i -> IO.println("数字: " + i);
    case null -> IO.println("是 null");
    default -> IO.println("其他类型");
}
```

## record

传统写法
```java
// 传统写法：冗长且容易出错
public final class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return x; }
    public int y() { return y; }

    @Override
    public boolean equals(Object o) { ... }
    @Override
    public int hashCode() { ... }
    @Override
    public String toString() { ... }
}
```

record写法
```java
public record Point(int x, int y) {}
```
```record```适用于不可变数据载体，比如：DTO、API 返回对象、数据库实体、临时数据结构等。不适合需要复杂逻辑或可变状态的类。

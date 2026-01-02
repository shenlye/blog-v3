---
title: "告别红温，在 Bun 和 Hono中找回写的意义"
description: "暂时搁置没做完的 Blender 甜甜圈和 Flutter 待办清单，从零搭建一个属于自己的后端。不为追求复杂，只为找回那份快感。"
date: 2026-01-02
updated: 2026-01-02
type: story
categories: []
tags: []
---

## 告别无意义

最近在忙各种事情，随便尝试了一下 Blender，跟着Youtube教程做甜甜圈，还只做了一半都没到；然后又想试试 Flutter，一个todolist也只把最基本的跑通，ui也没优化，还新开了一个个人主页仓库，也没写多少，坑慢慢填，不是不填。

我时常陷入自我怀疑：**重复写已有的东西有意义吗**？

我可以直接 Fork 别人的现成的仓库，然后随便改改，就可以拿去用了。不过这样的话会导致一个问题，简单的我不屑去写，难的呢我又写不出来

如果全丢给 AI Agent，确实能瞬间生成一大堆代码，但那种对话式编程极其无聊——你看不到代码的灵魂，还得反复跟 AI 拉扯直到红温，想上手改又太过于无能，改不动，只能继续下贱的求 AI 写好。

我感觉到，我写代码只是觉得好玩和有掌控感而已，我只是想有个玩具，不是ai给我的，是我自己拼出来的

## 技术选型

我不想再纠结这些，我开了一个后端仓库，考虑到我总得有个自己的后端，总得写个自己的后端

在技术栈的选择上，我跳过了那些让我头疼的选项，直奔最符合 TypeScript 直觉的组合。

### 1.运行时: Bun

有三个运行时，Nodejs Deno Bun，其中，Nodejs因为配置太烦了我没考虑，Deno因为感觉太奇怪我也没考虑，Bun就很全能，速度是最快的，原生支持TS，内置了工具链，比如自动读取.env，自带的包管理器超快，连密码校验都内置好了。

### 2.框架：Hono

虽然 ElysiaJS 声称是 Bun 生态下最快的，但它有一套独特的学习成本。而 Hono 更加标准化。轻量、极简，完美适配 Web 标准，写起来比较清爽。

### 3.ORM：Drizzle ORM

在 Prisma 和 Drizzle 之间，我选择了后者。Prisma 虽然强大，但那层 DSL 和生成步骤总让人觉得有些隔阂。Drizzle 是纯 TypeScript 代码，没有复杂的文档门槛，代码补全极其友好，上手即写，这种“所见即所得”的体验比 Prisma 爽得多。

### 格式化和代码检查

在代码格式化和检查上，我彻底抛弃了 Prettier 和 ESLint 的复杂组合，选择了 Biome。后端代码不需要那么多花哨的配置，Biome 的特点就是快，装上即用，这种轻松感是之前没有的。不用再在 .eslintrc 和 .prettierrc 的冲突中反复横跳。Biome 把 Linter 和 Formatter 合二为一，这种**开箱即用**的体验，配合 Bun 的快，让整个开发链路没有任何滞涩感。

### 别的什么

会过头来，功能好像没写很多，不过学到不少概念，比如

#### 路由 Routing

比如，控制访问哪个路径，就去执行哪的代码，`/auth/login` `/auth/register`，这就是路由，只是定义路径

#### 处理 Handlers

这是路由的后面一步，接受请求，验证数据之后要调用service，最后返回响应

#### 服务 Service

这里是放业务逻辑的地方，不过我发现我的结构还没有service，我把这个和handlers写到一起了，因为目前的代码还没复杂到需要拆分，只有单个文件代码多了再考虑拆分，我选择先在 Handler 里通过 Drizzle 直连数据库，不为未来的不确定买单，也是一种智慧。

#### 数据访问层 Repository

这地方似乎是写sql的？用来增删改查数据库的？可能是我用了drizzle，我没用到啊

#### Schma

写类型的地方，可以控制前端传来的json必须长什么样子，还可以写报错消息

#### 文档自动生成

通过`@hono/zod-openapi`, 自动生成json文档，可以直接导入apifox，很爽，还能直接生成页面，然后直接在里面测试，也很爽

### 关于数据库的碎碎念

起初想用 SQLite 这种文件数据库图个省事，但既然打算在 VPS 上运行，看着闲置的内存，我觉得是时候了解一下 PostgreSQL 了。比起文件的简单，Postgres 的严谨或许能带给我更多后端开发的实感。

## 细节

当前的开发还在非常早期，不过我已经有了不少的新收获，比如我锁定了默认分支，只允许通过Pull requests合并代码，虽然麻烦了一点，但是有个非常好的好处，有人能给我 Review 了，每次提交完，qodo会先看一遍我的代码，改完之后，我还能呼叫 copilot来看我的代码

还有github action，文档虽然我没自己看，不过已经配置好了默认分支提交自动构建容器，这样我就能在vps上一键更新了，以及每次提交都跑一遍`bunx @biomejs/biome ci .`，可以在我忘记手动执行`bunx @biomejs/biome check --write .`跳出来告诉我

### 登录接口响应速度太快也是一种漏洞？

qodo在pr里指出了这个，作为一个小项目，虽然我可以不用考虑这么多细节，但是让我知道了还是感觉很有趣

之前
```ts
const user = await db
    .select()
    .from(users)
    .where(or(eq(users.username, identifier), eq(users.email, identifier)))
    .limit(1);

if (user.length === 0) {
    return c.json({ message: "Invalid username/email or password" }, 401);
}

const isMatch = await Bun.password.verify(password, user[0].passwordHash);

if (!isMatch) {
    return c.json({ message: "Invalid username/email or password" }, 401);
    
```

之后
```ts
const user = await db
    .select()
    .from(users)
    .where(or(eq(users.username, identifier), eq(users.email, identifier)))
    .limit(1);

    
const foundUser = user[0];

const dummyHash = "$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$q/v5V4AmI3f23aVw7V7d2A";
const passwordHash = foundUser ? foundUser.passwordHash : dummyHash;
const isMatch = await Bun.password.verify(passwordHash, password);

if (!foundUser || !isMatch) {
    return c.json({ message: "Invalid username/email or password" }, 401);
}
```

总得来说，如果用户登入，直接查数据库，用户不存在会立刻返回401，如果用户存在才去运行`Bun.password.verify`，这是个耗时操作，如果黑客输入错误用户，10ms就返回了401，那么可以直接判断这个用户不存在，如果100ms才返回401，那么就知道了用户存在，只是密码错了，然后黑客就能写个脚本跑出所有邮箱，这叫“用户枚举”（User Enumeration）

这段代码准备了一个假的hash，即便没查到人，也会执行一遍verify，这下无论对比谁，消耗的时间就都一样了

### 顶层执行

```ts
export const authMiddleware = createMiddleware(
    async (c: Context, next: Next) => {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return c.json({ error: "Internal server error" }, 500);
        }

        const jwtMiddleware = jwt({
            secret: jwtSecret,
        });

        try {
            return await jwtMiddleware(c, next);
        } catch {
            return c.json({ error: "Unauthorized" }, 401);
        }
    },
);
```

这样一段代码中，每当有请求进来`const jwtMiddleware = jwt({ secret: jwtSecret });`这里都要 new 一个对象，虽然这个开销极小，但是应该放在外面，全局复用。啊，原来当我`import`时，不只是读取并且存起来导出的东西，他会先执行一段顶层的代码，这个我才知道，学到了

（待续）

虽然仓库还很简陋，虽然代码都没什么难点，虽然我还在填以前的坑，但至少每一行代码都是我亲自敲出来的（tab也算的话）。这种对代码的掌控感，是任何 AI Agent 都无法提供的温存。
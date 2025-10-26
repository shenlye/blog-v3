---
title: "Arch Linux 安装"
description: "记录Arch Linux的安装过程"
date: 2025-10-26
updated: 2025-10-26
type: story
categories: [Linux]
tags: ["arch", "教程"]
---

闲的没事干，来装 Arch Linux，刚好老师要求，虽然要求的是虚拟机。

## 准备工作

### 下载镜像

从 [北京外国语大学开源软件镜像站](https://mirrors.bfsu.edu.cn/archlinux/iso/) 下载 Arch Linux 镜像。

进入 **latest/** 目录，选择以 `.iso` 结尾的文件进行下载。

### 制作启动盘

非常建议使用 [Ventoy](https://www.ventoy.net/cn/index.html) 来制作可启动 U 盘，详情见官网简介。

Ventoy 的优势：
- 第一次会格式化 U 盘，后续不影响存储文件
- 可以启动多种格式文件：ISO/WIM/IMG/VHD(x)/EFI
- 可以放置 [WePE](https://www.wepe.com.cn/) 来随时启动维护Windows
- 可以放置 Windows或 Linux 的 ISO 来随时安装
- 甚至可以制作一个 VHD 来随时启动 U 盘里真正的 Windows 或 Linux

### 腾出安装空间

在 Windows 下右键开始菜单，进入**磁盘管理**，可以看到当前的分区情况（例如：EFI 分区 + Windows 分区 + 恢复分区）。

**操作步骤：**
1. 右键 Windows 的分区
2. 点击**压缩卷**
3. 选择需要缩小的空间大小（例如 64GB）
4. 确认后会出现一个未分配的空闲分区

::alert{type="warning"}
**注意：** 如果无法缩小分区，可以通过 Ventoy 进入 WePE，使用里面的硬盘工具来缩小硬盘。
::

## 安装系统

### 进入 Live 环境

不同的电脑进入 UEFI 的方式不同，需要自行搜索（例如：F12、F2、Del 等）。

**操作步骤：**
1. 重启电脑，按下对应按键进入启动菜单
2. 选择 U 盘启动
3. 选择 `Arch.iso`
4. 进入 Arch Linux Live 环境

### 联网

最简单的方式是使用 USB 共享网络（通过手机或其他设备）。

验证网络连接：

```bash
ping baidu.com
```

### 查看磁盘分区

```bash
lsblk
```

**输出示例：**

```bash
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0         7:0    0 957.5M  1 loop /run/archiso/airootfs
sda           8:0    0 238.8G  0 disk
├─sda1        8:1    0 238.7G  0 part
└─sda2        8:2    0    32M  0 part
nvme0n1     259:0    0 476.9G  0 disk
├─nvme0n1p1 259:1    0   512M  0 part
├─nvme0n1p2 259:2    0 406.4G  0 part
└─nvme0n1p3 259:3    0   128M  0 part
```

**说明：**
- `loop0`：当前的 Live 环境
- `sda`：Ventoy U 盘
- `nvme0n1`：硬盘
  - `nvme0n1p1`：EFI 分区
  - `nvme0n1p2`：Windows 分区
  - `nvme0n1p3`：Windows 恢复分区

::alert{type="info"}
**注意：** 本教程基于 UEFI 启动模式。如果是传统 BIOS，操作会有所不同。
::

### 创建新分区

进入分区工具：

```bash
fdisk /dev/nvme0n1
```

**操作步骤：**
1. 按 `n` 创建新分区
2. 按回车使用默认分区号
3. 按回车从空闲处开始
4. 按回车使用所有空闲空间
5. 按 `w` 保存并退出

::alert{type="info"}
如果需要 swap 分区，应该预留一部分空间。本教程暂不创建 swap。
::

让系统识别新分区：

```bash
partprobe /dev/nvme0n1
```

### 格式化分区

将新创建的分区格式化为 ext4 文件系统：

```bash
mkfs.ext4 /dev/nvme0n1p4
```

### 挂载分区

挂载根分区：

```bash
mount /dev/nvme0n1p4 /mnt
```

创建 EFI 目录并挂载 EFI 分区（与 Windows 共用）：

```bash
mkdir -p /mnt/boot/efi
mount /dev/nvme0n1p1 /mnt/boot/efi
```

验证挂载情况：

```bash
lsblk
```

确认：
- `nvme0n1p1` 应该挂载在 `/mnt/boot/efi`
- `nvme0n1p4` 挂载在 `/mnt`

### 安装基础系统

安装基本系统和必要软件：

```bash
pacstrap /mnt base linux linux-firmware vim sudo networkmanager
```

**软件包说明：**
- `base`：最简系统（shell、基本命令、systemd 等）
- `linux`：Linux 内核（系统启动必需）
- `linux-firmware`：硬件驱动固件（WiFi、显卡、声卡等）
- `vim`：文本编辑器（也可以选择 `nano`）
- `sudo`：权限管理工具
- `networkmanager`：网络管理工具（方便以后连接 WiFi）

### 生成 fstab 文件

生成文件系统表，用于开机自动挂载分区：

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

**参数说明：**
- `-U`：使用 UUID 标识分区，防止设备改名导致无法启动

### 进入新系统

使用 chroot 进入新安装的系统：

```bash
arch-chroot /mnt
```

## 系统配置

### 设置 Root 密码

```bash
passwd
```

输入两次密码来设置 root 账号密码。

### 安装和配置引导程序

安装 GRUB 和 EFI 管理工具：

```bash
pacman -S grub efibootmgr
```

**软件包说明：**
- `grub`：引导加载器
- `efibootmgr`：管理 UEFI 引导项的工具

安装 GRUB 到 EFI 分区：

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=Arch
```

**参数说明：**
- `--target=x86_64-efi`：为 64 位 UEFI 系统安装
- `--efi-directory=/boot/efi`：指定 EFI 分区挂载点
- `--bootloader-id=Arch`：在 UEFI 启动菜单中显示的名称

生成 GRUB 配置文件：

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```

### 创建普通用户

创建新用户并加入 wheel 组：

```bash
useradd -m -G wheel 你的用户名
```

**参数说明：**
- `-m`：自动创建用户家目录（`/home/用户名`）
- `-G wheel`：将用户加入 wheel 组（便于后续赋予 sudo 权限）

设置用户密码：

```bash
passwd 你的用户名
```

### 配置 sudo 权限

编辑 sudoers 文件：

```bash
EDITOR=vim visudo
```

找到以下行并取消注释（删除前面的 `#`）：

```bash
# %wheel ALL=(ALL) ALL
```

改为：

```bash
%wheel ALL=(ALL) ALL
```

保存并退出（在 vim 中输入 `:wq`）。

### 启用网络服务

启用 NetworkManager，以便系统启动后可以连接网络：

```bash
systemctl enable NetworkManager
```

### 完成安装

退出 chroot 环境：

```bash
exit
```

重启系统：

```bash
reboot
```

重启后，系统会自动进入 Arch Linux。如果想默认进入 Windows，可以在 UEFI 设置中修改启动顺序。


## 安装桌面环境

系统重启后，默认进入命令行界面。以下步骤将安装 KDE 桌面环境。

### 安装 KDE Plasma

```bash
pacman -S plasma sddm
```

**软件包说明：**
- `plasma`：KDE 桌面环境
- `sddm`：显示管理器（登录界面）

### 启用显示管理器

设置开机自动启动图形界面：

```bash
systemctl enable sddm
```

### 安装常用应用

```bash
pacman -S konsole firefox dolphin
```

**应用说明：**
- `konsole`：KDE 终端模拟器
- `firefox`：火狐浏览器
- `dolphin`：KDE 文件管理器

重启系统后，即可进入图形化的桌面环境：

```bash
reboot
```

---

至此，Arch Linux 基本安装完成！你已经拥有一个可用的 KDE 桌面环境。


## 安装显卡驱动

我的电脑是双 GPU，同时有核显和独显，现在的游戏本都是这样吧。

进入系统后发现卡得完全动不了？别慌，按 `Ctrl + Alt + F3` 进入控制台（别忘了，如果你没有锁定功能键，比如需要 `Fn + Esc` 切换，那你就得额外按 `Fn`，或者干脆锁定功能键）。

然后执行以下命令安装 NVIDIA 驱动：

```bash
sudo pacman -S nvidia nvidia-utils nvidia-settings
```

重启就好了：

```bash
reboot
```

## 系统优化

### 设置时区

同步系统时间到中国时区：

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

## 安装专有软件

像 Chrome、VS Code 这样的软件，你无法直接去官网下载 `.deb` 包安装（这里是 Arch 啊），就得用到 **AUR（Arch User Repository）** 了。

但是有个经典的**鸡生蛋、蛋生鸡问题**：
- 安装 AUR 助手（如 `paru`、`yay`）需要下载源码
- 下载源码需要网络环境（科学上网）
- 配置科学上网需要用 `paru` 下载 Clash Verge Rev
- 但是下载 Clash Verge Rev 需要 `paru`……


最后朋友发来一个 `clash-verge-rev-bin-2.4.2-2-x86_64.pkg.tar.zst` 包，直接安装了

```bash
sudo pacman -U clash-verge-rev-bin-2.4.2-2-x86_64.pkg.tar.zst
```

然后导入订阅，开启代理就能愉快地使用 AUR 了。

::alert{type="warning"}
**注意：** 之前忘记安装编译工具，先安装：
```bash
sudo pacman -S base-devel
```
::

### 安装 AUR 助手

这里以 `yay` 为例：

```bash
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

安装完成后，就可以使用 `yay` 来安装 AUR 中的软件了。

### 安装常用软件

安装 QQ：

```bash
yay -S linuxqq
```

安装中文字体（避免中文显示方块）：

```bash
sudo pacman -S noto-fonts noto-fonts-cjk
```

**字体说明：**
- `noto-fonts`：Google Noto 字体系列
- `noto-fonts-cjk`：中日韩（CJK）字符支持

---

::alert{type="info"}
待续...
::


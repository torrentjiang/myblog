---
toc: content
---

# MYSQL 命令整理...

MySQL 日常使用命令 增删改查 权限分配 导入导出等

### 连接 MySQL

格式： `mysql -h(host) -u(user) －p(password)`

### 修改密码

格式：`mysqladmin -u用户名 -p旧密码 password 新密码`

```shell
# 给root加个密码ab12
mysqladmin -u root -password ab12

# 再将root的密码改为djg345
mysqladmin -u root -p ab12 password djg345
```

### 创建新用户

格式:`CREATE USER 'username'@'host' IDENTIFIED BY 'password'`

### 给用户分配表

格式：`grant all on 数据库.* to 用户名@登录主机 identified by “密码”`

### 创建数据库

命令：create database <数据库名>

#### 创建数据库并分配用户

- CREATE DATABASE 数据库名;
- GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP,ALTER ON 数据库名.\* TO 数据库名@localhost IDENTIFIED BY '密码';
- SET PASSWORD FOR '数据库名'@'localhost' = OLD_PASSWORD('密码');

### 使用数据库

use <数据库名>;

### 查看表

show tables;

### 创建表

create table 表名(字段列表)
栗：

```mysql
CREATE TABLE `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '项目名称',
  `module` varchar(20) DEFAULT NULL COMMENT '模块描述',
  PRIMARY KEY (`id`)
);
```

#### 允许 root 外网登录

```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'youpassword' WITH GRANT OPTION;
```

`--skip-lock-tables` 备份有表锁的数据库

### windows 开启 MySQL general log 日志

```shell
mysql@localhost.(none)>show global variables like "%genera%";
mysql@localhost.(none)>set global general_log=on;
```

### 导出数据库结构

```shell
mysqldump --opt -d 数据库名 -u root -p > xxx.sql
```

### 连接字段

```
function statistics_list($where = '', $start = 0, $end = 15, $start_time, $end_time){
    $sql = "SELECT statistics.*,store.* FROM ecs_touch_sale_statistics statistics, ecs_touch_store store
WHERE statistics.store_id = store.id AND
UNIX_TIMESTAMP(CONCAT('-',statistics.`year`,statistics.`month`,statistics.`day`)) > ".$start_time." AND
UNIX_TIMESTAMP(CONCAT('-',statistics.`year`,statistics.`month`,statistics.`day`)) < ".$end_time.$where."  LIMIT ".$start.",".$end;
    return $GLOBALS['db']->getAll($sql);
}
```

### JOIN

#### INNER JOIN：内连接会返回两个表中满足连接条件的交集数据。只返回那些在两个表中都存在的行。

```mysql
SELECT *
FROM table1
INNER JOIN table2 ON table1.column_name = table2.column_name;
```

#### LEFT JOIN (OUTER JOIN)：左连接会返回左表的所有行以及满足连接条件的右表的匹配行。如果右表没有匹配，将返回 NULL 值。

```mysql
SELECT *
FROM table1
LEFT JOIN table2 ON table1.column_name = table2.column_name;
```

#### RIGHT JOIN (OUTER JOIN)：右连接与左连接类似，但会返回右表的所有行以及满足连接条件的左表的匹配行。

```mysql
SELECT *
FROM table1
RIGHT JOIN table2 ON table1.column_name = table2.column_name;
```

#### FULL JOIN (OUTER JOIN)：全连接会返回左表和右表的所有行，如果没有匹配的行，将填充 NULL 值。

```mysql
SELECT *
FROM table1
FULL JOIN table2 ON table1.column_name = table2.column_name;
```

###

```
UPDATE ecs_touch_sale_statistics SET add_time = UNIX_TIMESTAMP(CONCAT(`year`,`month`,`day`))
```

#### mysqldump 命令

```mysql
mysql mysqldump 只导出表结构 不导出数据
mysqldump --opt -d 数据库名 -u root -p > xxx.sql

备份数据库

#mysqldump　数据库名　>数据库备份名
#mysqldump　-A　-u用户名　-p密码　数据库名>数据库备份名
#mysqldump　-d　-A　--add-drop-table　-uroot　-p　>xxx.sql

1.导出结构不导出数据
mysqldump　--opt　-d　数据库名　-u　root　-p　>　xxx.sql　　

2.导出数据不导出结构
mysqldump -u root -p   -t 数据库名 >> xxx.sql

3.导出数据和表结构
mysqldump　数据库名　-uroot　-p　>　xxx.sql　

4.导出特定表的数据和结构
mysqldump　-uroot　-p　-B　数据库名　--table　表名　>　xxx.sql　　
5.导出指定表的数据
mysqldump -t database -u username -ppassword --tables table_name1 table_name2 table_name3 >xxx.sql
6.导出指定表的结构
mysqldump -d database -u username -ppassword --tables table_name1 table_name2 table_name3>xxx.sq

导入数据：
　　由于mysqldump导出的是完整的SQL语句，所以用mysql客户程序很容易就能把数据导入了：

#mysql　数据库名　<　文件名
#source　/tmp/xxx.sql　　

```

### 字段处理

```mysql
0: 查看表结构
DESCRIBE 【表名字】
1：删除列
ALTER TABLE 【表名字】 DROP 【列名称】
2：增加列
ALTER TABLE 【表名字】 ADD 【列名称】 INT NOT NULL  COMMENT '注释说明'
3：修改列的类型信息
ALTER TABLE 【表名字】 CHANGE 【列名称】【新列名称（这里可以用和原来列同名即可）】 BIGINT NOT NULL  COMMENT '注释说明'
4：重命名列
ALTER TABLE 【表名字】 CHANGE 【列名称】【新列名称】 BIGINT NOT NULL  COMMENT '注释说明'
5：重命名表
ALTER TABLE 【表名字】 RENAME 【表新名字】
6：删除表中主键
Alter TABLE 【表名字】 drop primary key
7：添加主键
ALTER TABLE sj_resource_charges ADD CONSTRAINT PK_SJ_RESOURCE_CHARGES PRIMARY KEY (resid,resfromid)
8：添加索引
ALTER TABLE sj_resource_charges add index INDEX_NAME (name);
9: 添加唯一限制条件索引
ALTER TABLE sj_resource_charges add unique emp_name2(cardnumber);
10: 删除索引
alter table tablename drop index emp_name;
11: 在指定字段之前添加一个字段
ALTER TABLE 【表名字】 ADD 【列名称】 INT NOT NULL  COMMENT '注释说明' AFTER 【在字段之后】;
```

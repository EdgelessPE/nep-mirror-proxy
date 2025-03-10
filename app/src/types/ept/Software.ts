// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

export type Software = {
  /**
   * 软件上游 URL，可以是官方网站的下载页或发行商/组织提供的发行详情页。
   */
  upstream: string;
  /**
   * 软件分类，推荐为 Edgeless 插件包分类中的一种。
   */
  category: string;
  /**
   * 软件的编译目标架构，缺省表示安装时不检查架构兼容性。
   */
  arch: string | null;
  /**
   * 软件语言，`Multi`表示多语言。
   */
  language: string;
  /**
   * 主程序路径，可以是相对路径或绝对路径。
   * 如果使用绝对路径，必须以[内置变量](/nep/workflow/2-context.html#内置变量)开头。
   */
  main_program: string | null;
  /**
   * 标签，用于联想推荐相似包或聚合多个相近的包。
   * 不需要重复输入包名、分类或是作者名中的信息。
   */
  tags: Array<string> | null;
  /**
   * 别名，用于关联查找。
   * 不需要重复输入标签中的信息。
   */
  alias: Array<string> | null;
  /**
   * 注册表入口，如果该软件是调用安装器安装的且在注册表中有 Uninstall 入口，提供该字段可以免去编写卸载工作流并帮助 ept 获取更多信息。
   * 支持如下 3 个位置的入口：
   * ```
   * HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
   * HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
   * HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall
   * ```
   */
  registry_entry: string | null;
};

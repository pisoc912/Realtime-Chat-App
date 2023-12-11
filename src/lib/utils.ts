export function mergeClassNames(...classes) {
  const uniqueClasses = new Set(); // 使用 Set 来避免重复的类名

  classes.forEach((className) => {
    if (typeof className === "string") {
      className.split(" ").forEach((cls) => uniqueClasses.add(cls)); 
    } else if (typeof className === "object" && className !== null) {
      Object.keys(className).forEach((key) => {
        if (className[key]) {
          uniqueClasses.add(key); // 如果条件为真，添加类名
        }
      });
    }
  });

  return Array.from(uniqueClasses).join(" "); // 将 Set 转换为字符串
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

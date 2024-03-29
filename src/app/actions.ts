export async function getApi() {
  try {
    const res = await fetch("http://localhost:8080/");
    const data = await res.json();
    return data;
  } catch (error) {
    return { message: "Error" };
  }
}

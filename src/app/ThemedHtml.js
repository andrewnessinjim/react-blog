import { cookies } from "next/headers";
import ThemeProvider from "@/components/ThemeProvider";
import Html from "./Html";
import { THEME_COOKIE_NAME } from "@/constants";

function ThemedHtml(props) {
  const savedTheme = cookies().get(THEME_COOKIE_NAME);
  const theme = savedTheme?.value || "light";

  return (
    <ThemeProvider initialTheme={theme}>
      <Html {...props} />
    </ThemeProvider>
  );
}

export default ThemedHtml;

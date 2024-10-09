import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { invoke } from "@tauri-apps/api/tauri"; // 引入 tauri API

const XingChenPage = () => {
  const [loading, setLoading] = useState(false);

  // Modify handleRedirect to accept redirectUrl as a parameter
  const handleRedirect = async (redirectUrl: string) => {
    try {
      setLoading(true);
      // Open the URL using Tauri's invoke
      await invoke("open_web_url", { url: redirectUrl });
    } catch (error) {
      console.error("获取 URL 失败:", error);
      alert("请求失败，无法跳转");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        进入星辰VPN官网
      </Typography>

      {/* Container for the buttons, setting flexDirection to 'row' to align buttons horizontally */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2, // Space between buttons
          flexDirection: "row",
          marginTop: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleRedirect("https://9999922.xyz")}
          disabled={loading}
        >
          {loading ? "打开中..." : "通道1"}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleRedirect("https://9999911.xyz")}
          disabled={loading}
        >
          {loading ? "打开中..." : "通道2"}
        </Button>
      </Box>
    </Box>
  );
};

export default XingChenPage;

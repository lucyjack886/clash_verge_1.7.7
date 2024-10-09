use reqwest::header::USER_AGENT;
use reqwest::{Client, Error};
use serde::Deserialize;
use std::time::Duration;
use tauri::command;

#[derive(Debug, Deserialize)]
struct Config {
    api: String,
}

async fn fetch_config(url: &str) -> Result<Config, Error> {
    let client = Client::builder()
        .timeout(Duration::from_secs(15))
        .build()?;

    let resp = client
        .get(url)
        .header(USER_AGENT, "My-Rust-Client")
        .send()
        .await?;

    if resp.status().is_success() {
        let config: Config = resp.json().await?;
        Ok(config)
    } else {
        Err(reqwest::Error::new(
            reqwest::StatusCode::from_u16(resp.status().as_u16())?,
            "Failed to fetch config".into(),
        ))
    } 
}

#[tauri::command]
pub async fn get_api_url() -> Result<String, String> {
    let url = "https://m.goudan.site/oss/config.json";
    match fetch_config(url).await {
        Ok(config) => Ok(config.api),
        Err(e) => Err(format!("Error fetching config: {}", e)),
    }
}

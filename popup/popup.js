document.getElementById("summarizeButton").addEventListener("click", async function() {
  const selectedAgreement = document.getElementById("agreement-select").value;
  const apiKey = await getApiKey();
  
  // Request the page HTML from the content script
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getPageHTML" }, async (response) => {
          const pageHTML = response.html;
          const summary = await summarizeAgreement(selectedAgreement, pageHTML, apiKey);
          document.getElementById("result").textContent = summary;
      });
  });
});

async function summarizeAgreement(agreementType, pageHTML, apiKey) {
  const prompt = `Extract and summarize the ${agreementType} from the following HTML:\n${pageHTML}`;
  
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
  };
  
  const data = {
      model: "gpt-4o-mini",
      messages: [
          { role: "system", content: "You are a law professor specialized in reading legal documents and summarizing their most important points." },
          { role: "user", content: prompt },
      ],
  };

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result.choices[0].message.content;
  } catch (error) {
      console.error("Error calling ChatGPT API:", error);
      return "Error summarizing the agreement.";
  }
}

// News Feed API
// v.0.0.1 first iteration
// v.0.0.2 advanced work with templates <===
// v.0.0.3 advanced findDifference() method
// v.0.0.4 divide newsFile feature
// v.0.0.5 cache api integration

class NewsFeed {
  consoleStart = '[News Feed API]';
  consoleStyle = 'background-color: hsl(225, 30%, 15%); color: white; padding: 3px 4px;';
  constructor(feedElement, newsFile) {
    this.feed = feedElement;
    this.newsFile = newsFile;
    this.feedName = feedElement.id;
  }
  async install() {
    if (localStorage[this.feedName + 'State'] !== 'installed') {
      let newsFile = await fetch(this.newsFile);
      if (!newsFile.ok) {
        console.error(`${consoleStart} News File have %c${response.status} status%cCheck way to your News File or change file`, consoleStyle);
        return;
      };
      let newsList = await newsFile.json();
      localStorage[this.feedName + 'Data'] = newsList;
      localStorage[this.feedName + 'State'] = 'installed';
      return {alreadyInstalled: false, data: JSON.parse(newsList)};
    } else if (localStorage[this.feedName + 'State'] === 'installed') {
      let newsList = localStorage[this.feedName + 'Data'];
      return {alreadyInstalled: true, data: JSON.parse(newsList)};
    };
  }
  async check() {
    let newsFile = await fetch(this.newsFile);
    let newsList = await newsFile.json();
    newsList = JSON.parse(newsList);
    let savedList = JSON.parse(localStorage[this.feedName + 'Data']);
    let difference = this.findDifference(newsFile, savedFile);
    if (difference.new.length > 0 || difference.delete.length > 0) {
      localStorage[this.feedName + 'Data'] = JSON.stringify(newsList);
      return {anyNews: true, new: difference.new, delete: difference.delete};
    };
    return {anyNews: false};
  }
  findDifference(fetchList, savedList) {
    let newNews = fetchList.filter(item => {
      !savedList.find(save => save === item);
    });
    console.log(newNews);
    let deleteNews = savedList.filter(item => {
      !fetchList.find(fetch => fetch === item);
    };
    console.log(deleteNews);
    return {new: newNews, delete: deleteNews};
  }
  async renderAll(newsList) {
    for (let news of newsList) {
        let response = await fetch(news);
        let data = await response.json();
        data = JSON.parse(data);
        this.render(data);
      };
    return {done: true};
  }
  template = {}
  setTemplate(template, variablesBoolean) {
    this.template.HTML = template;
    this.template.variables = variablesBoolean;
  }
  setDefaultTemplate() {
    let defaultTemplate = `
      <time>$(date)</time>
      <h3>$(title)</h3>
      <p>$(text)</p>
    `;
    this.setTemplate(defaultTemplate, false);
    console.warn(`${consoleStart} Set your custom template for render with %csetTemplate()%cmethod`, this.consoleStyle);
  }
  render(data) {
    if (!this.template.HTML) this.setDefaultTemplate();
    let filledTemplate = this.template.HTML;
    for (let item in data.HTML) {
      filledTemplate = filledTemplate.replace(`$(${item})`, data.HTML[item]);
    };
    let article = document.createElement('article');
    article.innerHTML = filledTemplate;
    if (this.template.variables && data.variables) for (let item in data.variables) {
      article.style.setProperty(item, data.variables[item]);
    };
    this.feed.prepend(article);
  }
};

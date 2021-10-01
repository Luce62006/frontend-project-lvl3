import {FormWidget} from "./form.widget";
import {FeedsWidget} from "./feeds.widget";
import {initPhrases} from "./phrases";
import i18next from "i18next";
import {PostsWidget} from "./posts.widget.js";

const model =  {
    rssFeeds: []
}

export default async  function  initPage ()  {
    // жду инициализации словарика фраз
    await initPhrases;

    // виджеты страницы
    let widgetForm, widgetFeeds, widgetPosts;

    // парсинг RSS строки в объектную модель
    const parseRss = (data) => {
        const rssFeed = {
            posts: []
        };

        // eslint-disable-next-line no-undef
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");

        const channel = doc.querySelector('channel')
        if (!channel) {
            return undefined;
        }
        rssFeed.title = channel.querySelector('title')?.textContent;
        rssFeed.description = channel.querySelector('description')?.textContent;

        doc.querySelectorAll('item').forEach((item) => {
            rssFeed.posts.push( {
                title: item.querySelector('title').textContent,
                link: item.querySelector('link').textContent,
                description: item.querySelector('description')?.textContent,
                pubDate: item.querySelector('pubDate').textContent,
                guid: item.querySelector('guid').textContent
            })
        })

        return rssFeed;
    }

    // обновить данные для RSS потока
    const updateRss = (url, rssFeed) => {
        console.log('Обновляю RSS информацию по ' + url);
        // eslint-disable-next-line no-undef
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const updatedFeed = parseRss(data.contents);
                if (updatedFeed) {
                    // новые посты - это те, которых не было раньше в rss потоке
                    const newPosts = updatedFeed.posts.filter((post) =>
                        !rssFeed.posts.find((e) => e.guid === post.guid)
                    );

                    // если новые посты есть
                    if (newPosts?.length > 0) {
                        console.log('Появились новые посты!');
                        console.log(newPosts);

                        // то добавляю себе в список новые посты
                        rssFeed.posts.push(...newPosts);
                        widgetPosts.addPosts(newPosts);
                    } else {
                        console.log('Нет новых постов, было получено: ' + rssFeed?.posts.length);
                    }
                }
            }).catch(error => {
            console.error(error);
        }).finally(() => {
            // чем бы там не закончилось обращение - взвожу таймер повторно
            setTimeout(() => { updateRss(url, rssFeed); }, 5000);
        });
    }

    // обработать полученные данные RSS потока (в виде строки)
    const processRss = (rssFeedSource, data) => {

        // строю объектную модель RSS потока
        const rssFeed =  parseRss(data);

        if (!rssFeed || !rssFeed.title) {
            widgetForm.status(false, 'Ресурс не содержит валидный RSS');
            return;
        }

        const existingFeed = model.rssFeeds.find((e) => e.title === rssFeed.title);
        if (existingFeed) {
            widgetForm.status(false, 'RSS уже существует');
            return;
        }

        model.rssFeeds.push(rssFeed);
        widgetFeeds.addFeed(rssFeed);
        widgetPosts.addPosts(rssFeed.posts);


        // завожу таймер для выполнения повторного опроса
        setTimeout(() => { updateRss(rssFeedSource, rssFeed); }, 5000);
    }

    // обработчик добавления нового RSS потока
    const rssFeedHandler = (sender, url) => {
        const rssFeedSource = 'https://hexlet-allorigins.herokuapp.com/get?url=' + url +'&disableCache=true'
        // eslint-disable-next-line no-undef
        fetch(rssFeedSource)
            .then(response => response.json())
            .then(data => {
                sender.status(true, i18next.t('RSS успешно загружен'));
                processRss(rssFeedSource, data.contents);
            })
            .catch((error)=> {
                console.error(error);
                sender.status(false, i18next.t('rssError'));
            })
    }

    widgetFeeds = new FeedsWidget('#feedsRss', {
        phrases: i18next
    })

    widgetForm = new FormWidget('#formRss', {
        phrases: i18next,
        onNewRssFeed: rssFeedHandler
    });

    widgetPosts = new PostsWidget('#postsRss', {
        phrases: i18next
    })


}

 initPage() ;

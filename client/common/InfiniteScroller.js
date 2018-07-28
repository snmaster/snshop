/**
 * Created by ChitSwe on 1/3/17.
 */

function topPosition(domElt) {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}

const ReactDOM = require('react-dom');

module.exports = function (React) {
    if (React.addons && React.addons.InfiniteScroll) {
        return React.addons.InfiniteScroll;
    }
    React.addons = React.addons || {};
    var InfiniteScroll = React.addons.InfiniteScroll = React.createClass({
        getDefaultProps: function () {
            return {
                page: 0,
                hasMore: false,
                loadMore: function () {},
                threshold: 250
            };
        },
        componentDidMount: function () {
            this.pageLoaded = this.props.page;
            this.dom  = ReactDOM.findDOMNode(this);
            this.attachScrollListener();
        },
        componentDidUpdate: function () {
            this.pageLoaded = this.props.page;
            this.dom  = ReactDOM.findDOMNode(this);
            this.attachScrollListener();
        },
        render: function () {
            var props = this.props;
            return React.DOM.div({className:props.className,style:props.style}, props.children, props.hasMore && (props.loader || InfiniteScroll._defaultLoader));
        },
        scrollListener: function () {
            var el = this.dom;
            //var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            // if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
            //     this.detachScrollListener();
            //     // call loadMore after detachScrollListener to allow
            //     // for non-async loadMore functions
            //     this.props.loadMore(this.pageLoaded += 1);
            // }
            if((el.scrollHeight - el.offsetHeight)- el.scrollTop <5){
                this.detachScrollListener();
                this.props.loadMore(this.pageLoaded +=1);
            }
        },
        attachScrollListener: function () {
            if (!this.props.hasMore) {
                return;
            }

            this.dom.addEventListener('scroll', this.scrollListener);
            window.addEventListener('resize', this.scrollListener);
            //this.scrollListener();
        },
        detachScrollListener: function () {
            this.dom.removeEventListener('scroll', this.scrollListener);
            window.removeEventListener('resize', this.scrollListener);
        },
        componentWillUnmount: function () {
            this.detachScrollListener();
        }
    });
    InfiniteScroll.setDefaultLoader = function (loader) {
        InfiniteScroll._defaultLoader = loader;
    };
    return InfiniteScroll;
};
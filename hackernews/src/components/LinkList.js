import React from 'react';
import Link from './Link';
import {createFragmentContainer, graphql} from 'react-relay';

class LinkList extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div>
        {this.props.viewer.allLinks.edges.map((node) => {
          console.log(this.props.viewer.allLinks);
          return(<Link key={node.node.id} link={node.node}/>)
        })}
      </div>
    );
  }

}

export default createFragmentContainer(LinkList, graphql`
  fragment LinkList_viewer on Viewer {
    allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks") {
      edges {
        node {
          ...Link_link
        }
      }
    }
  }
`)

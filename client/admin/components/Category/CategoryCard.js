import React from "react";
import {compose} from "react-apollo";
import {connect} from "react-redux";
import {Card,CardHeader,CardAction} from "material-ui/Card";
class CategoryCard extends React.Component{

    render(){

        let {id,Name} = this.props;

        return(
            <div className="col-lg-2  col-sm-4 col-xs-12">
                <Card>
                    <CardHeader title={Name} subtitle={Name} />
                </Card>
            </div>
        );
    }
}

export default compose(
    connect(
        state=>({}),
        dispatch=>({

        })
    )  
) (CategoryCard);
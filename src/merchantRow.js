import React from 'react';

class MerchantRow extends React.Component {
    render() {
        return <table key={this.props.merchant.id} className="tableStyle"> 
        <tbody> 
          <tr>
            <th className="merchantHeading">
                {this.props.merchant.company_name}
            </th>
          </tr>
          <tr>
            <td>
            Location:
              <ul>
               {
                this.props.merchant.location.map((details, index) => {
                  return <li key={index}> {details} </li>
                })
              }
              </ul>

            </td>
          </tr>
        </tbody>
      </table>
    }
}

export default MerchantRow
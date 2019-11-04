import _ from 'lodash';
import styled from 'styled-components';
import React from 'react';

const Wrappr = styled.div`
  width: 800px;
  margin: 10px auto 30px;
  padding: 0px 10px;
  h3 {
    margin: 15px 0 10px;
    font-size: 16px;
    color: #212121;
  }
  
  p {
    margin: 0 20px;
    padding: 5px 4px;
    border-radius: 3px;
    font-size: 12px;
    background-color: var(--bilibili-pink);
    color: var(--pure-white);
  }
  a {
    color: var(--pure-white);
  }
`;

/**
 * Author: DrowsyFlesh
 * Create: 2019/11/4
 * Description:
 */
class QuestionnaireArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrappr id="announcement">
        <h3>问卷调查 ~ QUESTIONNAIRE</h3>
        <p>关于POPUP页面的问卷，很简短，请参与填写一下~：→ <a href="https://docs.qq.com/form/edit/DUHZ3allZS0ZYQlBN">link</a></p>
      </Wrappr>
    );
  }
}

export default QuestionnaireArea;

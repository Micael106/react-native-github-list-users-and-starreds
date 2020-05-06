import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background: #fff;
`;

export const Header = styled.View`
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 2px;
  border-color: #eee;
`;

export const Avatar = styled.Image`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background: #ddd;
`;

export const Name = styled.Text`
  font-size: 22px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: #555;
  margin-top: 5px;
  text-align: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 20px 30px;
  border-radius: 10px;
  padding: 20px;
  background: #eee;
`;

export const Info = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
export const Description = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 12px;
  margin-top: 5px;
  color: #555;
`;

/*
 * Copyright 2026-present fuhouyu.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Tooltip } from 'antd';
import { EnvironmentOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { GlassTag, GlowText, IconLink, InfoContent, StyledAvatar, TagGroup, UserInfoWrapper, } from './style';

export const Userinfo = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME;
  const email = import.meta.env.VITE_EMAIL;
  const city = import.meta.env.VITE_CITY;
  // 生成头像 URL
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  return (
    <UserInfoWrapper>
      <StyledAvatar size={80} src={avatarUrl} />

      <InfoContent>
        <GlowText>
          <h1 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.1 }}>{username}</h1>
        </GlowText>

        <TagGroup>
          {/* 城市标签 - 纯展示 */}
          {city && <GlassTag icon={<EnvironmentOutlined />}>{city}</GlassTag>}

          {/* GitHub 链接标签 */}
          {username && (
            <Tooltip title="GitHub" arrow={false}>
              <IconLink href={`https://github.com/${username}`} target="_blank" rel="noreferrer">
                <GlassTag icon={<GithubOutlined />}>Github</GlassTag>
              </IconLink>
            </Tooltip>
          )}

          {/* Email 链接标签 */}
          {email && (
            <Tooltip title="Email" arrow={false}>
              <IconLink href={`mailto:${email}`}>
                <GlassTag icon={<MailOutlined />}>Email</GlassTag>
              </IconLink>
            </Tooltip>
          )}
        </TagGroup>
      </InfoContent>
    </UserInfoWrapper>
  );
};

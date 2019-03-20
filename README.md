# README


DB設計
_____________________________________

usersテーブル

| Column | Type | Options |
|--------|------|---------|
| name | string | null:false, unique:true, |
| email | string | unll:false, unique:true |
| password | string | null:false |

Association
  ・ has_many:messages
  ・ has_many:members
  ・ has_many:groups,through:members


membersテーブル

| Column | Type | Options |
|--------|------|---------|
| user_id | integer | nul:false, foreign_key:true |
| group_id | integer | null:false, foreign_key:true |

Association
  ・ belongs_to:user
  ・ belongs_to:group


groupsテーブル

| Column | Type | Options |
|--------|------|---------|
| name | string | null:false, add_index |

Association
  ・ has_many:messages
  ・ has_many:members
  ・ has_many:users,through:members


messagesテーブル

| Column | Type | Options |
|--------|------|---------|
| body | text | |
| image | string | |
| group_id | integer | null:false, foreign_key:true |
| user_id | integer | null:false, foreign_key:true |

Association
  ・ belongs_to:user
  ・ belongs_to:group



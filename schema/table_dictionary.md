# Table Dictionary

This dictionary describes the public Parquet tables included in this release. Each table is derived from observable GitHub repository or file-version evidence published under `data/`.

## lock_file_snapshot

Description: Immutable snapshot of a GH-AW lock file associated with a specific source Markdown file version.

- Rows: 2820

| Column | Type | Key Hint | Description |
| --- | --- | --- | --- |
| lock_file_snapshot_id | int64 | PK | Internal release identifier for the `lock_file_snapshot` row. |
| source_markdown_file_version_id | int64 | FK | Source Markdown version associated with this lock-file snapshot. |
| path | string |  | Path of the observed file inside the repository. |
| content | string |  | Observed file content published in this release. |
| file_sha | string |  | Git blob SHA observed for the lock-file content when available. |

## repository

Description: One row per GitHub repository observed in the release. The table carries repository identity, ownership, language, popularity counters, timestamps, and the repository license value reported by GitHub when available.

- Rows: 262

| Column | Type | Key Hint | Description |
| --- | --- | --- | --- |
| repository_id | int64 | PK | Internal release identifier for the repository. |
| url | string |  | Canonical GitHub repository URL when available. |
| license | string |  | License key/name observed from GitHub repository metadata when available. |
| repo_full_name | string |  | GitHub owner/name repository identifier. |
| repo_owner | string |  | Repository owner or organization. |
| repo_name | string |  | Repository name without owner. |
| main_language | string |  | Primary language reported by GitHub when available. |
| forks | int64 |  | Fork count reported by GitHub at observation time. |
| stars | int64 |  | Stargazer count reported by GitHub at observation time. |
| created_at | string |  | Repository creation timestamp reported by GitHub. |
| updated_at | string |  | Repository update timestamp reported by GitHub. |
| pushed_at | string |  | Most recent push timestamp reported by GitHub. |

## source_markdown_file_history

Description: Version-history grouping for confirmed GH-AW source Markdown files. It records the observed number of versions for each history.

- Rows: 604

| Column | Type | Key Hint | Description |
| --- | --- | --- | --- |
| source_markdown_file_history_id | int64 | PK | Internal release identifier for the `source_markdown_file_history` row. |
| version_count | int64 |  | Number of observed versions in the source Markdown file history. |

## source_markdown_file_snapshot

Description: Immutable snapshot of a confirmed GH-AW source Markdown file observed in a repository. It stores the file path and the Markdown content split into frontmatter and body when available.

- Rows: 2820

| Column | Type | Key Hint | Description |
| --- | --- | --- | --- |
| source_markdown_file_snapshot_id | int64 | PK | Internal release identifier for the `source_markdown_file_snapshot` row. |
| repository_id | int64 | FK | Internal release identifier for the related repository. |
| path | string |  | Path of the observed file inside the repository. |
| content | string |  | Observed file content published in this release. |
| frontmatter | string |  | YAML frontmatter extracted from the Markdown content when present. |
| body | string |  | Markdown body after frontmatter extraction. |

## source_markdown_file_version

Description: Ordered version record for a GH-AW source Markdown file. It links a history to a snapshot and to the commit metadata that makes the version observable.

- Rows: 2820

| Column | Type | Key Hint | Description |
| --- | --- | --- | --- |
| source_markdown_file_version_id | int64 | PK | Internal release identifier for the `source_markdown_file_version` row. |
| source_markdown_file_history_id | int64 | FK | Internal release identifier linking this row to a related table. |
| source_markdown_file_snapshot_id | int64 | FK | Internal release identifier linking this row to a related table. |
| commit_sha | string |  | Git commit SHA that makes this file version observable. |
| committed_at | string |  | Commit timestamp associated with this observed version. |
| rank | int64 |  | Version order inside the observed file history. |
| predecessor_source_markdown_file_version_id | int64 | FK | Previous observed version in the same history when available. |
| successor_source_markdown_file_version_id | int64 | FK | Next observed version in the same history when available. |

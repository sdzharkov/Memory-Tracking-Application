## Memory Tracking application

An application built for a coding challenge that keeps track of page crashes for a given website. The initial graph is a count for the number of crashes while the second graph displays memory usage of a web page over a given span of time. 

<img src="https://github.com/sdzharkov/Memory-Tracking-Application/img.PNG" width="400px" height="400px">

The data was built with the following structure:

1. timestamp. Integer. Seconds since epoch time that the report was recorded.

2. bytes_used. Integer. The number of bytes that the webpage was using.

3. current_page. String. The current relative URL that the webpage was on.

4. did_aww_snap. Boolean. If the page crashed since the last report.

## Postgres Database
```sql
CREATE TABLE reports (
    id SERIAL,
    timestamp integer NOT NULL,
    bytes_used integer NOT NULL,
    current_page varchar(255) NOT NULL,
    did_aww_snap boolean NOT NULL
);

CREATE INDEX reports_timestamp_index ON reports
    USING btree (timestamp);

CREATE INDEX reports_bytes_used_index ON reports
    USING btree (bytes_used);

CREATE INDEX reports_current_page_index ON reports
    USING btree (current_page);

CREATE INDEX reports_did_aww_snap_index ON reports
    USING btree (did_aww_snap);
```


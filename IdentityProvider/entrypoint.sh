#!/bin/bash

set -e
run_cmd="dotnet run --urls https://*:5000"

until dotnet ef database update --context ApplicationDbContext; do
>&2 echo "SQL Server is starting up"
sleep 1
done

until dotnet ef database update --context ConfigurationDbContext; do
>&2 echo "SQL Server is starting up"
sleep 1
done

until dotnet ef database update --context PersistedGrantDbContext; do
>&2 echo "SQL Server is starting up"
sleep 1
done

>&2 echo "SQL Server is up - executing command"
exec $run_cmd
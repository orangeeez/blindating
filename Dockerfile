FROM microsoft/aspnetcore-build
 WORKDIR /blindating
 EXPOSE 8000 8001 8002	
 COPY . .
 RUN dotnet restore
 WORKDIR /blindating/src/Blindating
 CMD /blindating/services.sh && /bin/bash

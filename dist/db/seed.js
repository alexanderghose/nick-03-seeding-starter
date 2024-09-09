"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movies_1 = __importDefault(require("../models/movies"));
const movieData = [
    { name: 'Diehard', year: 1988, image: "https://m.media-amazon.com/images/M/MV5BZDViZDAzMjAtY2E1YS00OThkLWE2YTMtYzBmYWRjMWY0MDhkXkEyXkFqcGdeQXRzdGFzaWVr._V1_QL75_UY281_CR19,0,500,281_.jpg" },
    { name: 'The Grinch', year: 2000, image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jim-carey-the-grinch-1665564473.jpg?crop=0.969xw:0.664xh;0,0.0444xh&resize=640:*" },
    { name: 'Home Alone', year: 1990, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhMTExAWFRUXGRYVGBcWFRcYFBcYGBUYGBsYGRcbHiggGBolHhcVITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGi0mHiUzLS0tLy0vNy0rLTUtLy0uLS0tLy0vLTctLS01MC0tLy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAUDBgcCAQj/xABAEAABAwIDBAcGBAMHBQAAAAABAAIRAyEEMUEFElFhBiJxgZGhsRMyUsHR8AdCouFigvEUIyRDcrLCJTOSo7P/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QALREAAgIBAwIEBQQDAAAAAAAAAAECEQMSITEE8CJBUWETMqGxwSNxgZFC0fH/2gAMAwEAAhEDEQA/AOvoiKJIIiIAiIgCIiAIiIAiIgCIiAIi1bpF0xp0ARThzhYuPuA/8vvNRckuSUYuXBtDnACSYHE5Kmx/SrC0iQ6pJGe6J/r3LkW2emmIq70vLm8CLdzRYeZWt1No1HFpc492WeVuFk3Z3wrk7VX6f0pO7TMDMvIae4CVnwHTrD1Dunqntn1hcKdjnjqk6mJkzM8ea8VqzgAZM659senglS9Q5Q9D9LYLalGr/wBuq0nKJh3gbqYvzng9r1GwZmL8yPmui9HOmFRzRDt4fC7rOHYcyFxyrk6oKXynR0VVgdu0359U9vV8VagqSafBFprkIiLpEIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAL45wAJJgC5K+qj6UVnFrKLTG/JceDBn4/LmoylpVkox1Oih6QdIzU3msO7RHVnI1DqBrH3fJaPtHDuq5E2mAW9X695U/pRjgwimwXiAM4H395rFhqFX2Zc5xMiPH+qyOb+ZnoRxxrSadi6RaBzns5991E9gQHA2i4W5bVwFqY3ciRPMR9SvWJ2JvUH1ALtP7epVyzrYol0r3aNGxTDx1nwUmjT3x3eKmnZ8zocwsmBwZBLdbR2z9+Stc1RnWJ2RsJRsOVvkVe7DEODSYB90iwnQH5KOcHDp0MA8j92VphcICIcM7fKOWnkqZzTRpx4mi0pY1zXEOsRedCOzxVzsjpQaJl3WpH3gL7v8bD6jXtWr4yuWxq5lnTmRx8I+5UKlXALhk2cuTtOzIquNrdE5JPZndKNVr2hzSHNcAQRkQdV7Wgfhrtn3sK88X050+Jvqe4rf1qTtGKUdLoIiKREIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgC1bbeK69Z+jG7g7ru8/RbPUfAJ4AnwC0DalQllRmu75uDifMrP1EqVGnpo3KzXNl4Q18QXuGUQO4fNbZXwYDRb8zT+oKv6MUonsC2RzJELI3ZuezKHbGzv7ukYu1xJ7xf5rLsvCb2FcCPeB8irrEUd5rhwgrDsdgAezQEnxEouTjl4TRmYHdrNtYwPvzXvaGygyqQBaYHC4kDvmO2Fe7QoAEH4SPM29V52xh95zjxHyEFFJkqToq8HhWxBFo9fmplTDAWInnxGnl6HkvGHNxN9fHP6r5tAlmtswT4/RLDW5UbZpZP1ktPOJIPhKp94Ew7I2nUajzt4cFeYirvBw+IGBzFx5gBUeIo9Ux2hX43tRRkiWFLGewq0K7fyua4xyjeb3iQu3gr8+tql7ADof3+a7xsmpvUKLuNNh/SFfj22MubemSkRFaUBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB5qiWkcj6LnG13Fr3RxA8BbzXSVpO2MJ13Hg4+Tvp6LL1K2TNfSOm0eNl0t0nhbyVyxVWBq9WRmS4DtkqY3BjNziTyJA8FlRsfuTBUA1zEKPh7PMa/JBTAXoABwIUiNFPtcdcjiR5OP0XjH1YEcvr9FL2rSl9PtP+791E2lT8vqoMsSVIh0IO5fL5yo+02yN2cpGmiw0aUkzxWetg7G58VyyyinLCL8N30n1lYm0hDhFmuc0dm6D81YmmdyDnP7LG6jAd93J+gCsUiuSKDCCKobz/wCS7vs1m7RpDgxg/SFwTDy6qY4ld/wtPdYxvwtaPAALbDk83K9kZURFaUBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAWm7aY9tWrBzO9ByutsxWJbTbvO7LZk8lrW2MQHvD2hwlsGQLkHkeCzdQ1VeZq6eMrutiPs6nF+0+Oay4jFEWbnx0XvDNsOxRq2HaXsNVu9THvMGR7R+YcllryNy9TAdoiYNZk8Jb9VNw9eVo+1NnYl2J3mNBYKjiYB3iy+61ujQAWRcRurd6AG6DuwYaDw3o6xHAE6K2UFHh2VQyOdpxomYho3QeF1TYirMuidAOJKscViOpCrMGQdycg6XDUjUA6H5Sq3TLIprdlTjWuYRDmAk5Fwt4lTKNQuaQfejxVF00p134j+6pN9nvjNpj2e6bNbu20MggyDnKsMNQ3RSLBuu3W74Hub0XMZA9malkxKMbTGLPKb0uNHzGmGiNP3+qpcVjn+5pczqTmtgxrCWmc1r9elceCjjrzJ5Fa2I3RzCF9emPiqNHi9oXeSuFYd5Yd5jy0tMhzbEGbQundAtq1a9J/tXFxY4Q4gSQRrGdwb81rhNXRizYJKGryRs6IivMQREQBERAEREAREQBERAEREAREQBERAEREAREQBERAUfSqlvNp5xvQY5kKGyi0MIyaFseJoB7S0/0K15+TgbEGDOUrDnhU9Xqel02TVj0ehg9uG6E20XvC1WvEgz9eCxsDpeCZtEwOHLtUCmDh3Cbte4E8i6ACOWSps0qCapclz7IcFiqtAClsUbFaDxU3wVrkrca87sqvwD5urzG027sLXMK32dUSZY8kA8HaBV1uXLeJd+zBzC8uoAKUBZRcS6SGjgSewaei7IjG2VOJaXlwaLC3fEqgxBgGdPXJbNTpgVnMYbez3+wkx8ytXxzAGPl1w82tln9UhyTkl5GDDtmeQJXUuguG3cPvR7xHgB9SVy3Z9USeYgd67XsqhuUabYiGt8SJPmStGGNzv0KeulpxKK8yUiIth44REQBERAEREAREQBERAEREAREQBERAEREAREQBERAFQ7fw0HeGTrHtH36q+WDHNmm//ST4CVVlhqjRdhyOE0zW6dCGl05qHi6W+xoHvS0CeMq0ZUlhCw49g3WxbrN9QvPa2PThNp7nmhi5eWOEECY4gGFg2tgPbANJtLSecaLDtB4bUoOnN274td84VrRdZSW52XhqSK7aOyd+n7MEtEAWJmBpPcq52yGtoiky0ODu8EX8ls76wgqqxNQaJJCE5eZl3+rKiskVGOIs87o4yf6LFhK0uLZzss2Kf/iaAmwcbfyOUeSaVbEfD0/8a4EWdTcP1NP1Wr7dwZbXcxrS4uEgASSQToOS3DatTdxNA/xFp72uH0UCg/8A6rh44vH/AK3Sp414kiuU2lq9is6LdF61ao1z6bmUmkFxe0tkA+60G5JynILrKIt8YKJ5ubPLK9wiIplAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAF5qs3mubxBHiIXpFw6a1Tp9RfXtkN3uPyWVwgEfxR+pfMS2d0LzGj1VI17phiAxtM8KlPycCfJQNvdI2UBLyYyDW5uKzfiIA3CPd8O6R/wCQXPMdga2LL35ikwvEmLAbxPbn4K3FBS54JSy6IWlb/wCmys6YUXAQKnZH7ws1Db7HWBLToHZKg2RgGljTnItGqlP2aTYNmdElGF0bMcZuKcmjbtlVAajDzCttruDX0nRcVGeBcAfIlV+wdlmk7D7zjvFsuadDBiDqM/BWG3m9an/rYI/naqmqM8mnJURNvsIr0DoHt8yAoeEZG1sP2v8A/m9S+lb+vRHGoz1lRdlmdrUCeFWO6k/91Zi+dFGR/p/wdJREXoHlBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBEVTt/pHh8I2ar+sfdptg1HdjZsOZgLlkoxcnSREq+8WnPeM/fevlS7m8p+S17BdKRiqziKfs4iBMkgWk88vJX7XTBXmS2k0erolGtS3IPSfACrRcwiZGXctJ6KVXUwWw0uaDRcHjqnUE8DHqV0etcLVK2GFCsXwNx9qgI00d3ekrqlRZiaezRD2PsJ9AWDYnqy6QBwHALLVr1aZk+zkcQSDygG62VmApxZvgSAsVXAMHutEnXM+aNvllsckFtXf9mHowH1C6tVmSYbIiw4DQcuSy7YEvYeDmu8HA/JWeGpbrQAq3aQkyoy4KNWqdlV0lqWa/wCFzT+pfejVH2+0KT25UGPe48d9pY0fqJ/lKpukWMG7E2F1edBttYPC4curYqm2rWdvEXJa1tmtMC2rr/Er+nhb1FXUS0wo6IiiYDadGsJo16dT/Q9ro7QDZS1tPMCIi6cCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgChbU2tQw7d6tVawaA3cexoue4Ki6a9LP7IBTpgGs4Tf3WA2DiNTwHeefIMVi3VXF9R7nudm5xJdI0kquU62Rv6fonkWqWyOm7R/E2i2RRoPqEavIY08wLnxAVXU/FKreMLTsJu55t4Bc+eLjwPZ9+qA92ncoambl0eFbae/p7G0bY6e4ysWgVBSaZtSBaZGRLiS7wIC1urjXVT7R7i5zrlzjLjzJKjVnHdPZ4GJvysvOFEDgDGZuXGZR7rc7jShk0wVJ9/j6llg8UaZ3gSCL28FbYbpRXblUkfxAHmtfdkeY7sl6pudPvCMxr9xbxKrcE9zVJ3JJr6G6YPpwf82mDzbbyJKl1ukdCs2JLTweI8xZaA8kflkyMtYuBnw9F8pYhpi+pPCZBIA42/2qDxJojLHj1ej772OkbK22A0sc67LZ5t/KfC3csD+mVBhcYe8j4QIjjJPFc9r1iHtAiTb5kdllmqDPLIjsm+XaE+EvNlfw1JySXBulb8QfeDcPkQOs/jHLmqrH9Mnu/wAsAExnNj+9vktdqDOwgkHTQD6BR3CbWy4i8klw7QprHFkZ41DZI97U2z7QZEHheMuPeFS4V7nEyT62tprqvmMBa6Ygxnp2ACwF1Gw+Jey+7EyQIjvvmtUYpLY8XLkbyeMu8NiXte32T3Me0gh7SQWiJkO01ELccJ+I+OaA32jHi/WdTBcRaxLSJPdK0vBVA5uQEDhaTy+81LZawi1hplp6quTo9DFijOKk6ffFf2bu38TcWPyUTqZY8R4OF1nw34qVrb+GpHjDntzyzm6566XRJGZETYx65ZL1vxfdk8tP2XLZOWDE3enb9jreB/E/DOP97SfTHxAh7QeBiD4AraNi7fw+LBNCqHxmIc1w57rgDHPJfnpx1LbWhsCQZzP3opmy9s1cNVbUpOIqNBPVEtIObXTYtMZKSkzPl6aH+O3ffufotFSdEukjMbR32gse2BUpnNp4ji06H5hXamee006YREXTgREQBERAEREAREQBERAFVdJNu08JRNR93GzGTd7uHYNT+yIoydKy/psayZVF8HFNrY91eo+pUO85x3u/QAaAZKtdM+CIs8T6PLBRVIVB33B4a8e5fIA0gT2+96XKIpFbiq1d+p4bAdmLyOZjPwQGdJFuwyPCNERSe25mxVOWjvhP8kik251gfeS+vGfpoiKvzN0Ipxbfv+TDPhbXTjHy+iwmuQN57T3Z9U/lGgEm/BfEU0ZstqLafC/jmjBhRNZsOJABI5WyjQXyVpiqU2DouNb2EjzhfUTI6kQ6GMZ4JNrmT+yMVOmQBeTftvc3+9V9a6R4cJA4SO/wRFyzQoKNV+30RGZhQ52+4mJG6OfG955KPj6W8Q4x1czPoY8URTi3Zhz4orG17W/ufaExDBBmCYsNJHKylMceqDM65Rl6SiLknvR3BH9NSv8A1yj4x1x1gbE5QZOvr4rxiHiALSSABnLSfoCiLtbkFlcor32+yGFeHEkZDqjmLa8V9ru6vvbsRldwtrP3ZEXa8RzW/gJ+tlv0F27/AGXFsqguNN0MqlxO7uOIk9rbOtw5r9AtINwZBuCMiiKS5ow5o+CM/Nn1ERSM4REQBERAf//Z" }
];
// ! This is a program to put data into the database.
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO we connected to the database.
        // ! This has mongoose connect to Mongodb. This string should have your DB name at the end.
        yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/moviesdb');
        console.log('Connected to the database! 🔥');
        // ! If you want to remove all the existing data in the db
        yield mongoose_1.default.connection.db.dropDatabase();
        console.log('Remove existing data.');
        // TODO describe what the data looks like (making a model) ✅
        // ! We made a movie model.
        // TODO put the data into the database
        const movies = yield movies_1.default.create(movieData);
        console.log('Here are the movies:');
        console.log(movies);
        // ! Final thing: disconnect from mongodb. Good practice to close
        // ! the session when you're finished.
        console.log('Disconnecting 🤖..');
        yield mongoose_1.default.disconnect();
    });
}
seed();

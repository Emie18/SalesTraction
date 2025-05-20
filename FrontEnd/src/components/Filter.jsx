import { useState } from 'react';

function Filter({ workMode, regions, sectors, commissions, onSearch, setOffers }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [filters, setFilters] = useState({
        region: '',
        sector: '',
        commissionRate: '',
        workMode: ''
    });

    const filterOptions = {
        region: regions,
        sector: sectors,
        commissionRate:commissions,
        workMode: workMode
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleSearch = async () => {
    const filtersToSend = {
        name: searchTerm,
        sector: filters.sector,
        region: filters.region,
        commission: filters.commissionRate,
        mode: filters.workMode
    };

    const cleanedFilters = Object.fromEntries(
        Object.entries(filtersToSend).filter(([_, v]) => v !== '')
    );

    const result = await onSearch(cleanedFilters);
    setOffers(result);
};


    const toggleAdvancedFilters = () => {
        setShowAdvancedFilters(!showAdvancedFilters);
    };

    const clearFilters = async () => {
    setFilters({
        region: '',
        sector: '',
        commissionRate: '',
        workMode: ''
    });
    setSearchTerm('');
    const result = await onSearch({});
    setOffers(result);
};

    return (
        <div className="filter">
            <div className="up">
            <div>
                <input
                className='searchbar'
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
         
            </div>

            <div>
                <button onClick={toggleAdvancedFilters}>
                    <img className={showAdvancedFilters ? "open" : ""} src='/filter_logo.svg'></img>
                </button>

            
                       <button  className='search_logo'onClick={handleSearch}><img src='/search_logo.svg'></img></button>
            </div>
</div>
<div className="down">
            {showAdvancedFilters && (
                <div>
                    {/* Region Filter */}
                    <div>
                        <label>Region</label>
                        <select value={filters.region} onChange={(e) => handleFilterChange('region', e.target.value)}>
                            <option value="">All</option>
                            {filterOptions.region.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sector Filter */}
                    <div>
                        <label>Business Sector</label>
                        <select value={filters.sector} onChange={(e) => handleFilterChange('sector', e.target.value)}>
                            <option value="">All</option>
                            {filterOptions.sector.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Commission Rate Filter */}
                    <div>
                        <label>Commission Rate</label>
                        <select value={filters.commissionRate} onChange={(e) => handleFilterChange('commissionRate', e.target.value)}>
                            <option value="">All</option>
                            {filterOptions.commissionRate.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Work Mode Filter */}
                    <div>
                        <label>Work Mode</label>
                        <select value={filters.workMode} onChange={(e) => handleFilterChange('workMode', e.target.value)}>
                            <option value="">All</option>
                            {filterOptions.workMode.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
                {showAdvancedFilters && Object.values(filters).some(v => v !== '') && (
                    <button  className='clearfilter' onClick={clearFilters}>Clear all filters</button>
                )}
        </div>
        </div>
    );
}

export default Filter;
